'use strict'
module.exports = function(_, Joi, reqValidataion, multifunction, pbxcoupling, responseMessage, auth) {
    return {
        SetRouting: function(router) {
            router.post('/tiggadesk/bulkupload', auth.setCustomHeaders, this.upload);
            router.post('/tiggadesk/originate/action', auth.setCustomHeaders, this.originate);
            router.get('/tiggadesk/bulkupload', this.upload);
            router.get('/', this.errorRoute);
            router.get('/dialout/', this.errorRoute);
        },
        errorRoute: (req, res) => {
            return res.json({
                message: `This function is currenlty not live Wait / contact adminstrator`
            });
        },
        originate: (req, res) => {
            updateOriginateAction(req.body).then(response => {
                console.log('res of update flag is the new acton in the bulkupload class');
            }).catch(err => {
                console.log('error')
            });

            async function updateOriginateAction(getParams) {
               

                try {
                    const selectResul = await multifunction.originate_object(getParams);
                    if (selectResul[0].message_type === "callback") {
                        actionForCallbackFailure(selectResul[0], getParams)
                    }
                } catch (error) {
                    console.log('on action required as this action is not of this flow::'+error.actionid);

                    
                }
            }

            function actionForCallbackFailure(callbackResponse, reqStatus) {
                
                var parseColumn = JSON.parse(callbackResponse['message_forwarder']);
                let localdata = {};
                if (reqStatus['reason'] === "5") {
                    // console.log('Boom Logout forcefully  ::' + parseColumn['ticket_auto_id']);
                    localdata['message'] = 'Logged out by the system as phone seems to be off hook',
                        localdata['tigga_user_id'] = parseColumn['agent_id'];
                    localdata['type'] = 'FLASH'
                    multifunction.notification(localdata);
                    multifunction.del_notification(localdata);
                } else if (parseColumn['retry_counter'] >= 2) {
                    //   console.log('Boom Logout Max Counter Reached   ::' + parseColumn['ticket_auto_id']);
                    localdata['message'] = 'Logged out by the system as maximum numbers of calls were not answered',
                        localdata['tigga_user_id'] = parseColumn['agent_id'];
                    localdata['type'] = 'FLASH'
                    multifunction.notification(localdata);
                    multifunction.del_notification(localdata);
                } else {
                    //  console.log('Boom just reset the flag of the user as free   ::' + parseColumn['agent_id']);
                    localdata['set_column_val'] = 0,
                        localdata['where_column_val'] = parseColumn['agent_id'];
                    multifunction.originate_action(localdata);
                }
            }
            return res.json({
                message: "This function is currenlty not live Wait / contact adminstrato"
            });
            /*

                        updateFlage(req.body)
                        .then(response => {
                            console.log('res of update flagggg');
                        })
                        .catch(err => {
                            console.log('error')
                        });

                        async function updateFlage(getParams) {

                            try {
                                
                        let toPickResult =  ['action_table','set_column','set_column_val','where_column','where_column_val'];
                           const selectResul  = await multifunction.originate_data(getParams,toPickResult);

                           let objToPAss    =   _.pick(selectResul[0],toPickResult);
                           

                            const updateResult = await multifunction.originate_action(objToPAss);

                        } catch (error) {
                        console.log(error);
                        }

                        }
                        return res.json({
                            message: `This function is currenlty not live Wait / contact adminstrator`
                        });

                        */
        },
        upload: (req, res) => {
            const schema = {
                agent_id: Joi.number().integer().required(),
                agent_group_id: Joi.number().integer().required(),
                client_id: Joi.number().integer().required()
            };
            let reqModifyOBJ = {};
            //console.log(req.method);
            if (req.method === "GET") reqModifyOBJ = req.query;
            else reqModifyOBJ = req.body;
            //console.log(reqModifyOBJ);
            /*
            @ sanjeev : need to fix this part pick the below request template from config instead of defining this
            here in the body part
            */
            let validationResult = reqValidataion.reqgetpost(reqModifyOBJ, schema);
            if (validationResult['Joierror']) {
                console.log(validationResult);
                return res.status(200).json(validationResult)
            }
            //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7867');
            //  res.setHeader('Access-Control-Allow-Origin', 'http://tonic.backend');
            let configTemplate = responseMessage.bulkupload(reqModifyOBJ, req);
            let responseTemplate = {
                message: configTemplate['responseKey']['SUCCESSRESPONSE'],
                uniq_key: configTemplate['queryKey']['req_uniqkey']
            }
            //  console.log(configTemplate);
            // return res.json(responseTemplate);
            validatebeforeCall(configTemplate['queryKey']).then(validateresponse => {
                // console.log('this is response of the async await', validateresponse);
                let errorArray = ['SELECT_FAILED_AGENT_BUSY', 'INSERT_FAILED_API_ERROR', 'AMI_REJECT_CALL_GENERATE', 'UPDATE_FAILED_RECORD_BULK', 'SELECT_FAILED_CALLIN_QUEQE', 'SELECT_FAILED_RECORD_BULK'];
                if (_.includes(errorArray, validateresponse['error_mapcode'])) {
                    // if (_.includes(['AMI_REJECT_CALL_GENERATE', 'UPDATE_FAILED_RECORD_BULK','SELECT_FAILED_CALLIN_QUEQE', 'SELECT_FAILED_RECORD_BULK'], validateresponse['error_mapcode'])) {
                    responseTemplate['message'] = configTemplate['responseKey'][validateresponse['error_mapcode']];
                    //  console.log('responseTemplate.message::',responseTemplate['message']);
                    if (validateresponse['error_mapcode'] === "AMI_REJECT_CALL_GENERATE") {
                        validateresponse['flag_value'] = '0';
                        validateresponse['retry_count'] = -1;
                        multifunction._updateFlagBulk(validateresponse);
                        multifunction._updateAgentFlag(validateresponse, 0);
                        // if any action required based on the error code 
                    }
                } else {
                    //ALL good Proceed further 
                    pushRecordsInDirectory(validateresponse).then(response => {
                        console.log(' insert response');
                    }).catch(error => {
                        console.log(error);
                    });
                }
                //lock error in database
                multifunction._insertErrorObject(validateresponse);
                // .then(whatis => {
                //    console.log('insert error / success result');
                //})
                //.catch(error => {
                //   console.log(error);
                //});
                //return validateresponse['error_code'];
            }).then(demo => {
                //  console.log('demodemo',demo);
                return res.json(responseTemplate);
            }).catch(error => {
                console.log(error);
            })
            //  console.log('what i go thats what i print',whatgetasResponse);
            //      console.log('papapap',rr);
            //      responseTemplate['message'] = configTemplate['responseKey'][rr];
            // return res.json(responseTemplate);
            async function pushRecordsInDirectory(customKey) {
                let responseTestme = customKey;
                try {
                    responseTestme = await multifunction.createBulkRecordsTicket(customKey);
                    responseTestme = await multifunction.bulkoutboundNote(responseTestme);
                    await multifunction.originatetableNote(responseTestme);
                } catch (ex) {
                    console.log(ex);
                }
                return responseTestme;
            }
            let amiARGS = ['req_uniqkey', 'outbound_auto_id', 'timezone', 'agent_id']
            async function validatebeforeCall(queryKey) {
                let replyback = null;
                try {
                    await multifunction.iboundcall_inqueue(queryKey);
                    //This will check the status of agent is live or not having acccess to this kind of flow 99% retrun true
                    //const agentDetails  =   await multifunction.validateAgentStatus(queryKey);
                    replyback = await multifunction.validateAgentStatus(queryKey);
                    //Check records in the repo and pick one for this agent to outdial
                    //const checkTicket2Dial = await multifunction.pickRecord2Outdial(agentDetails);
                    replyback = await multifunction.pickRecord2Outdial(replyback);
                    //If this is records then it will update the flag as used for requested agent
                    //const aa = await multifunction._updatePicketFlag(checkTicket2Dial);
                    await multifunction._updateFlagBulk(replyback);
                    await multifunction._updateAgentFlag(replyback, 2);
                    //If all goes correct then this will create a outbound call to the application agent
                    //const pbxresponse = await pbxcoupling.feedToVoiceApp(checkTicket2Dial);
                    replyback = await pbxcoupling.feedToVoiceApp(replyback, amiARGS);
                } catch (error) {
                    // console.log('222222');
                    replyback = error;
                }
                return replyback;
            }
        }
    }
}