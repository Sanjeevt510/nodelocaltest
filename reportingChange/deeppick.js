const _ = require('lodash');
const images = [{
    "sizes": {
        "thumbnail":
        {
            "height": 300,
            "width": 300,
            "url": "http://example.com/wp-content/uploads/2017/04/web-300x300.jpg",
            "orientation": "landscape"
        },
        "medium": {
            "height": 267,
            "width": 400,
            "url": "http://example.com/wp-content/uploads/2017/04/web-400x267.jpg",
            "orientation": "landscape"
        },
        "large": {
            "height": 441,
            "width": 660,
            "url": "http://example.com/wp-content/uploads/2017/04/web-1024x684.jpg",
            "orientation": "landscape"
        },
        "full": {
            "url": "http://example.com/wp-content/uploads/2017/04/web.jpg",
            "height": 1200,
            "width": 1796,
            "orientation": "landscape"
        }
    },
    "mime": "image/jpeg",
    "type": "image",
    "subtype": "jpeg",
    "id": 3589,
    "url": "http://example.com/wp-content/uploads/2017/04/web.jpg",
    "alt": "",
    "link": "http://example.com/web/",
    "caption": ""
}];


const result = images.map((image) => ({
  ..._.pick(image, ['alt', 'caption', 'id']),
  url: _.get(image, 'sizes.thumbnail.url')
}));

console.log(result);

caltempFunc();

function caltempFunc() {
  let p =  { executeDB: true,
        query_value:
         [ { incoming_type: 'tigga_call_incoming',
             tigga_state_id: 103,
             tigga_ticket_status_id: 19,
             assigned_user_id: 0,
             call_custkey: 70340656,
             caller_number: '478665517',
             incoming_type_id: '1546909286.448',
             tigga_agent_group_id: 1,
             tigga_client_id: '1002' } ],
        query_key: 'insert into tigga_ticket_tmp set ?',
        query_type: 'insert ',
        eventt: {},
        postaction:
         { bigTreeKey: 'ticket_id_update',
           bigTreeMethod: 'amedQuery',
           preAction: true },
        autoid: 347 }
          const result = p['query_value'].map((image) => ({
            //..._.pick(image, ['autoid', 'id']),
            url: _.get(image, 'call_custkey')
          }));
          
          console.log(result);
        console.log(_.pickDeep(p['query_value'],'call_custkey'))
       /* const result = p.map((image) => ({
            ..._.pick(image, ['autoid', 'id']),
            url: _.get(image, 'query_value.call_custkey')
          }));
          
          console.log(result);
      */
}