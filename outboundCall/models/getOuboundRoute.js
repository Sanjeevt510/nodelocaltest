module.exports  =   function(agent_object) {

let routeObject = agent_object;


if (agent_object['agent_channel'] === "siproute") {
    routeObject['call_endpoint'] = "SIP/" + agent_object['agent_number'] + "@pcim.siptocall.com";
} else if (agent_object['agent_channel'] === "voiproute") {
    routeObject['call_endpoint'] = "SIP/" + agent_object['agent_number'] + "@VoIPStudio";
} else {
    routeObject['call_endpoint'] = "DAHDI/G0/" + agent_object['agent_number'];
}

    return routeObject;

}