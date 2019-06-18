'use strict'
module.exports = function(multifunction, multiupdate, multiinsert, wlogger, moment, pbxcoupling, uniqid, auth) {
    return {
        SetRouting: function(router) {
            router.get('/sanjeev/channel/:id', this.indexPage);
            router.get('/sanjeev/copyfiles', this.copyFile);
            router.post('/sanjeev/copyfiles', this.copyFile);
            router.get('/broker/status/:agent_id', this.statusof);
            router.get('/dbdel/family', this.delfamily);
            //router.post('/tiggadesk/originate/action', auth.setCustomHeaders, this.originateaction);
        },
        delfamily: (req, res) => {
            console.log('reached here ');
            let localarray = ['mcall1513813769.90', 'mcxcall1530304312.5784', 'mcxcall1530650708.37897', 'mcxcall1530686772.12750'];
            localarray.forEach(function(entry) {
                pbxcoupling.delfamily(entry).then(lresponse => {
                    console.log(lresponse)
                }).catch(error => {
                    console.log(error)
                })
                console.log(entry);
            });
            return res.json({
                message: "Sanjeev Key[" + req.params.id + "] key [] thanks for the nw re"
            });
        },

        originateaction: (req, res) => {
            updateOriginateAction(req.body).then(response => {
                console.log('res of update flag is the new acton in the localhosttest class');
            }).catch(err => {
                console.log('error')
            });
            async function updateOriginateAction(getParams) {
                try {
                    const selectResul = await multifunction.originate_object(getParams);
                   
                    if (selectResul[0].message_type === "callback") {
                           actionForCallbackFailure(selectResul[0],getParams)
                    }
                  
                } catch (error) {
                    console.log(error);
                }
            }

            function actionForCallbackFailure(callbackResponse,reqStatus) {

                var parseColumn = JSON.parse(callbackResponse['message_forwarder']);
                let localdata = {};
                if(reqStatus['reason'] === "5") {
                console.log('Boom Logout forcefully  ::' + parseColumn['ticket_auto_id']);
               localdata['message'] = 'Logged out by the system as phone seems to be off hook',
               localdata['tigga_user_id'] =parseColumn['agent_id'];
                localdata['type'] = 'FLASH'

                multifunction.notification(localdata);
               multifunction.del_notification(localdata);

                }
                else if(parseColumn['retry_counter'] >= 3){
                console.log('Boom Logout Max Counter Reached   ::' + parseColumn['ticket_auto_id']);
               localdata['message'] = 'Logged out by the system as maximum numbers of calls were not answered',
               localdata['tigga_user_id'] =parseColumn['agent_id'];
                localdata['type'] = 'FLASH'

               multifunction.notification(localdata);
               multifunction.del_notification(localdata);


                }
                else {
                console.log('Boom just reset the flag of the user as free   ::' + parseColumn['agent_id']);
                localdata['set_column_val'] = 0,
                localdata['where_column_val'] =parseColumn['agent_id'];
                
                multifunction.originate_action(localdata);
                }
            }

            return res.json({
                message: "Sanjeev Key[] key [] thanks for the nw re"
            });
        },
        indexPage: (req, res) => {
            console.log(req.params);
            wlogger.info(req.params);
            wlogger.error(req.params);
            return res.json({
                message: "Sanjeev Key[" + req.params.id + "] key [] thanks for the nw re"
            });
        },
        copyFile: (req, res) => {
            let bodyP = req.body;
            console.log(bodyP);
            console.log(req.params);
            console.log(req.query);
            console.log(req.body);
            console.log('------', bodyP['defaultVoice']);
            console.log('------', bodyP['client_id']);
            let fileName = bodyP['file_listing'];
            //fileName.forEach(function(vv) {
            console.log(fileName)
            // console.log(JSON.parse(fileName))
            console.log(typeof fileName);
            //})
            return res.json({
                message: "Sanjeev Key[" + req.params.id + "] key [] pl share an array to procedd foruther"
            });
        },
        statusof: (req, res) => {
            /* @sanjeev
            -  status of agent 0 means free
            -  status of agent 2 means busy on other call
            */
            multifunction.agent_status(req.params).then(response => {
                //console.log('resssssss',response);
                return res.json(response);
            }).catch(error => {
                //  console.log(error);
                return res.json({
                    error_code: 400,
                    message: `requested again  ${req.params.agent_id} not found in the repo pl co-oridnate ADMINISTRATOR`
                });
            })
        }
    }
}