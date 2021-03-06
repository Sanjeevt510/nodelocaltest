const dependable = require('dependable');
const path = require('path');
const container = dependable.container();

const simpleDependencise = [
    ['_','lodash'],
    ['Joi','joi'],
    ['uniqid','uniqid'],
    ['moment','moment'],
    ['events','events']
];

simpleDependencise.forEach(function(val){
    container.register(val[0],function(){
        return require(val[1]);
    })
});

container.load(path.join(__dirname,'controllers'));
container.load(path.join(__dirname,'api/routes'));
container.load(path.join(__dirname,'api/middleware'));
container.load(path.join(__dirname,'helpers'));
container.load(path.join(__dirname,'config'));

container.register('container',function(){
return container;
});

module.exports = container;