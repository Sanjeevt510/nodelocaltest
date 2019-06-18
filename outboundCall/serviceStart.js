const express = require('express');
const http = require('http');
const PORT = 7867;
const bodyParser = require('body-parser');
const multer = require('multer');
const logger = require('./config/logger.js');
const container     =    require('./container');
//const {localfunction}  = require('./helpers/multifunction');

container.resolve(function(bulkupload,localtest,callback,escalation,callinqueue,agentkickoff,outboundcall,spyCaller){
const app = setupExpress();

function setupExpress() {
    
   try {
   
    const app = express();
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`server listing on port ${PORT}`);
    });
    configureExpress(app);
try {
    

    const router = require('express-promise-router')();
    bulkupload.SetRouting(router);
    localtest.SetRouting(router);
    callback.SetRouting(router);
    escalation.SetRouting(router);
    callinqueue.SetRouting(router);
    agentkickoff.SetRouting(router);
    outboundcall.SetRouting(router);
    spyCaller.SetRouting(router);

    
    app.use(router);
} catch (error) {
 console.log(error);
}
      
   } catch (error) {
  console.log(error);
} 

}
function configureExpress(app) {
  
    app.use(express.static('public'));
    //app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(morgan('combined'));

}
});
/*
console.log("application started");
var router = express.Router();
require('./routes/tonixOut.js')(router)
var srouter = express.Router();
require('./routes/tonixOut.js')(srouter)
logger.log('error', `Application started as fresh on port number ${listenPort}`);
let app = express();
//var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))
try {
    app.listen(listenPort);
} catch (err) {
    console.log("unable to listen on the port [" + listenPort + " ] started");
    logger.log('info', 'Application abort due to unknow error ');
    process.exit(1);
}
app.use('/tonix', router);
app.use('/dialout', srouter);

*/