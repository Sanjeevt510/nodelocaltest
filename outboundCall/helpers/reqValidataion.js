'use strict'

module.exports = function (Joi) {
    return {


        JioJio: function (req,res) {
            console.log('this come here for testing');
            //return false;
            return  res.json({
                message: "errorBase key [] thanks for the requesttttttt"
            });
            
        },
        
        reqparams : function(reqdata,schema) {

         
           // console.log(Joi.validate(reqdata.query, schema));
            const { error } = Joi.validate(reqdata.body, schema);
            let errorRespons    =   {
                Joierror : false,
                valid:1
            }
            if(error) {
                errorRespons = {
                    status:400,
                    message:error.details[0].message,
                    valid:0,
                    Joierror:true
                };
            }
            return errorRespons

        },
        reqgetpost : function(reqdata,schema) {

            const { error } = Joi.validate(reqdata, schema);
            let errorRespons    =   {
                Joierror : false,
                valid:1
            }
            if(error) {
                errorRespons = {
                    status:400,
                    message:error.details[0].message,
                    valid:0,
                    Joierror:true
                };
            }
            
            return errorRespons

        }
    }
}