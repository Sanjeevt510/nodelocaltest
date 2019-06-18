module.exports = function (uniqid) {


    return {

        bulkupload: function (reqModifyOBJ,req) {
            let template = {
            queryKey:{
                'agent_id': reqModifyOBJ.agent_id,
                'agent_group_id': reqModifyOBJ.agent_group_id,
                'clinet_id': reqModifyOBJ.client_id,
                'timezone': "Australia/Sydney",
                'res_code': 100,
                'exten': '98888890',
                'context': 'sip-cust',
                'req_uniqkey': uniqid.process('ob-'),
                'remoteAddress':req.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_GENERATE':'Internal Server Error Pl Contact AMI_REJECT_CALL_GENERATE',
                'SELECT_FAILED_RECORD_BULK':'Internal Server Error Pl Contact SELECT_FAILED_RECORD_BULK',
                'INSERT_FAILED_TICKET_BULK':'Internal Server Error Pl Contact INSERT_FAILED_TICKET_BULK',
                'UPDATE_FAILED_RECORD_BULK':'Internal Server Error Pl Contact UPDATE_FAILED_RECORD_BULK',
                'SUCCESSRESPONSE':'request accepted for further processing ',
                'SELECT_FAILED_CALLIN_QUEQE':'Internal Server Error Pl Contact SELECT_FAILED_CALLIN_QUEUE',
                'UPDATE_FAILED_CALLIN_QUEQE':'Internal Server Error Pl Contact UPDATE_FAILED_CALLIN_QUEUE',
                'SELECT_FAILED_AGENT_BUSY':'Internal Server Error Pl Contact SELECT_FAILED_AGENT_BUSY'
            }
        }
          return template;
        },
        callback: function (inputKey) {
            let template = {
            queryKey:{
                'agent_id': inputKey.body.agent_id,
                'ticket_auto_id': inputKey.body.ticket_id,
                'customer_number': inputKey.body.caller_no,
                'timezone': "Australia/Sydney",
                'res_code': 100,
                'exten': '98888889',
                'context': 'sip-cust',
                'req_uniqkey': uniqid.process('cb-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_GENERATE':'Internal Server Error Pl Contact AMI_REJECT_CALL_GENERATE',
                'SUCCESSRESPONSE':'request accepted for further processing ',
                'SELECT_FAILED_TICKET_NOFOUND':'Internal Server Error Pl Contact SELECT_FAILED_TICKET_NOFOUND',
                'INSERT_FAILED_CALLBACK':'Internal Server Error Pl Contact INSERT_FAILED_CALLBACK',
                'SELECT_FAILED_AGENT_BUSY':'Internal Server Error Pl Contact SELECT_FAILED_AGENT_BUSY'
            }
        }
          return template;
        },
        manager: function (inputKey) {
            let template = {
            queryKey:{
                'call_channel': inputKey.body.channel,
                'ami_action':'Atxfer',
                'timezone': "Australia/Sydney",
                'ami_exten': '99998888',
                'context': 'from-internal-custom',
                'req_uniqkey': uniqid.process('me-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_MANAGER':'Internal Server Error Pl Contact AMI_REJECT_CALL_MANAGER',
                'SUCCESSRESPONSE':'request accepted for further processing ',
            }
        }
          return template;
        }, 
        outboundTrans: function (inputKey) {
            let template = {
            queryKey:{
                'call_channel': inputKey.body.channel,
                'ami_action':'Atxfer',
                'timezone': "Australia/Sydney",
                'ami_exten': '99998884',
                'context': 'from-internal-custom',
                'req_uniqkey': uniqid.process('out-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_MANAGER':'Internal Server Error Pl Contact AMI_REJECT_CALL_MANAGER',
                'SUCCESSRESPONSE':'request accepted for further processing ',
            }
        }
          return template;
        },
        recording: function (inputKey) {
            let template = {
            queryKey:{
                'call_channel': inputKey.body.channel,
                'ami_action':'Atxfer',
                'timezone': "Australia/Sydney",
                'ami_exten': '99998885',
                'context': 'from-internal-custom',
                'req_uniqkey': uniqid.process('re-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_RECORDING':'Internal Server Error Pl Contact AMI_REJECT_CALL_RECORDING',
                'SUCCESSRESPONSE':'request accepted for further processing ',
            }
        }
          return template;
        },external: function (inputKey) {
            let template = {
            queryKey:{
                'call_channel': inputKey.body.channel,
                'ami_action':'Atxfer',
                'timezone': "Australia/Sydney",
                'ami_exten': '99998887',
                'context': 'from-internal-custom',
                'req_uniqkey': uniqid.process('ex-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_MANAGER':'Internal Server Error Pl Contact AMI_REJECT_CALL_MANAGER',
                'SUCCESSRESPONSE':'request accepted for further processing ',
            }
        }
          return template;
        },internal: function (inputKey) {
            let template = {
            queryKey:{
                'call_channel': inputKey.body.channel,
                'ami_action':'BlindTransfer',
                'timezone': "Australia/Sydney",
                'ami_exten': '99998886',
                'context': 'from-internal-custom',
                'req_uniqkey': uniqid.process('int-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_MANAGER':'Internal Server Error Pl Contact AMI_REJECT_CALL_MANAGER',
                'SUCCESSRESPONSE':'request accepted for further processing ',
            }
        }
          return template;
        },internalP: function (inputKey) {
            let template = {
            queryKey:{
                'call_channel': inputKey.body.channel,
                'ami_action':'BlindTransfer',
                'timezone': "Australia/Sydney",
                'ami_exten': '99998889',
                'context': 'from-internal-custom',
                'req_uniqkey': uniqid.process('inp-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_MANAGER':'Internal Server Error Pl Contact AMI_REJECT_CALL_MANAGER',
                'SUCCESSRESPONSE':'request accepted for further processing ',
            }
        }
          return template;
        },outboundCall: function (caller_number,inputKey) {
            let template = {
            queryKey:{
                'agent_number': caller_number,
                'customer_number': caller_number,
                'timezone': "Australia/Sydney",
                'agent_channel': "voiproute",
                'res_code': 100,
                'exten': '98888887',
                'context': 'sip-cust',
                'req_uniqkey': uniqid.process('out-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_GENERATE':'Internal Server Error Pl Contact AMI_REJECT_CALL_GENERATE',
                'SUCCESSRESPONSE':'request accepted for further processing ',
                'SELECT_FAILED_TICKET_NOFOUND':'Internal Server Error Pl Contact SELECT_FAILED_TICKET_NOFOUND',
                'INSERT_FAILED_CALLBACK':'Internal Server Error Pl Contact INSERT_FAILED_CALLBACK',
                'SELECT_FAILED_AGENT_BUSY':'Internal Server Error Pl Contact SELECT_FAILED_AGENT_BUSY'
            }
        }
          return template;
        },spyACall: function (requestData,inputKey) {
            let template = {
            queryKey:{
                'agent_number': requestData['manager_channel_number'],
                'customer_number': requestData['manager_channel_number'],
                'call_channel': requestData['spychannel'],
                'manager_user_id': requestData['manager_user_id'],
                'agent_user_id': requestData['agent_user_id'],
                'timezone': "Australia/Sydney",
                'agent_channel': requestData['manager_channel_route'],
                'res_code': 100,
                'exten': '98888876',
                'context': 'sip-cust',
                'req_uniqkey': uniqid.process('spy-'),
                'remoteAddress':inputKey.connection.remoteAddress ||req.socket.remoteAddress,
                'res_message': 'record process for request'
            },responseKey:{
                'AMI_REJECT_CALL_GENERATE':'Internal Server Error Pl Contact AMI_REJECT_CALL_GENERATE',
                'SUCCESSRESPONSE':'request accepted for further processing ',
                'SELECT_FAILED_TICKET_NOFOUND':'Internal Server Error Pl Contact SELECT_FAILED_TICKET_NOFOUND',
                'INSERT_FAILED_CALLBACK':'Internal Server Error Pl Contact INSERT_FAILED_CALLBACK',
                'SELECT_FAILED_AGENT_BUSY':'Internal Server Error Pl Contact SELECT_FAILED_AGENT_BUSY'
            }
        }
          return template;
        }
    }
}