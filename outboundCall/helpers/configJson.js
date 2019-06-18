let configJs = {
    "uploadbase":{
        "queryparams":{
                "agent_id": "req.query.agentno",
                "timezone": "Australia/Sydney",
                "rcode": 100,
                "exten": 98888890,
                "context": "sip-cust",
                "req_uniqkey": "uniqid.process('ob-')",
                "rmessage": "succesfull inserted outbound call data"
            },
            "responseparams":{
                "a":"base",
                "b":"nowbase"
            }
    }
}
module.exports = configJs;