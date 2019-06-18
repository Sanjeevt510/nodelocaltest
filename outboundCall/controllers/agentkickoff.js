'use strict'
module.exports = function(multifunction, multiupdate, multiinsert, wlogger, moment, uniqid, auth) {
    return {
        SetRouting: function(router) {
            router.get('/kickme/:agentid/', this.aauth, this.kickagent);
            router.post('/kickme/:agentid/', this.kickagent);
        },
        aauth: (req, res, next) => {
            //console.log('auth wala aith')
            next()
        },
        kickagent: (req, res) => {
            let retryc = null;
            //console.log(req.method);
            if (req.method === "GET") retryc = req.query.retry;
            else retryc = req.body.retry;
            let agentPacket = {
                agent_id: req.params.agentid,
                agent_retry: retryc,
                timenow: moment().format('YYYY-MM-DD HH:mm:ss').trim()
            };
            wlogger.debug(`request params are ${JSON.stringify(agentPacket)}`)
            let responseTemplate = {
                message: 'agent logout',
                uniq_key: uniqid.process('lout-')
            };
            const dbQury = async () => {
                let asyncResult = null
                try {
                    asyncResult = await multiupdate.kickAgentOut(agentPacket);
                    asyncResult = await multiinsert.kickOffHistory(agentPacket);
                } catch (e) {
                    wlogger.error(`request params errro  ${JSON.stringify(e)}`)
                    asyncResult = e;
                }
                return asyncResult
            }
            dbQury().then(response => {
                responseTemplate['message'] = response.message
                return res.json(responseTemplate);
            }).catch(error => {
                wlogger.error(`request params errro  ${JSON.stringify(error)}`)
                return res.json(error);
            });
        },
    }
}