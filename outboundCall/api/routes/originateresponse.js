'use strict'

module.exports = function (_, val_originate, multifunction,agentstatus) {

    return {
        SetRouting: function (router) {

            router.post('/tiggadesk/originate/action', val_originate.setCustomHeaders, this.originate);
            router.get('/tiggadesk/originate/action', val_originate.setCustomHeaders, this.originate);

        },

        originate: (req, res) => {
  
           let callbackResponse = req.body;
                
                var parseColumn = JSON.parse(callbackResponse['message_forwarder']);
                let localdata = {};
                if (reqStatus['reason'] === "5") {
                    // 5 means handset problem force logout the agent 
                    //console.log('Boom Logout forcefully  ::' + parseColumn['ticket_auto_id']);
                    localdata['message'] = 'Logged out by the system as phone seems to be off hook',
                    localdata['tigga_user_id'] = parseColumn['agent_id'];
                    localdata['type'] = 'FLASH'
                    agentstatus.agentForceLogout(localdata);
                        //multifunction.notification(localdata);
                   // multifunction.del_notification(localdata);
                } else if (parseColumn['retry_counter'] >= 2) {
                    //   console.log('Boom Logout Max Counter Reached   ::' + parseColumn['ticket_auto_id']);
                    localdata['message'] = 'Logged out by the system as maximum numbers of calls were not answered',
                    localdata['tigga_user_id'] = parseColumn['agent_id'];
                    localdata['type'] = 'FLASH'
                    agentstatus.agentForceLogout(localdata);
                    //multifunction.notification(localdata);
                   // multifunction.del_notification(localdata);
                } else {
                    //  console.log('Boom just reset the flag of the user as free   ::' + parseColumn['agent_id']);
                    localdata['set_column_val'] = 0,
                    localdata['where_column_val'] = parseColumn['agent_id'];
                    multifunction.originate_action(localdata);
                }
            
            return res.json({
                message: "This function is currenlty not live Wait / contact adminstrato"
            });
        }
    }
}
