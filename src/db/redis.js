const redis = require("redis");
const {REDIS_CONFIG}=require('./config');
const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
 
client.on("error", function(error) {
  console.error(error);
});
 
function set (key,val){
    if(typeof val === 'object'){
        val=JSON.stringify(val);   
    }
    client.set(key, val, redis.print);
}

function get(key){
   const promise = new Promise(function(resolve,reject){
     client.get(key,function(err, val){
         if(err){
             reject(err);
             return;
         }
         if(val == null){
            resolve(null);
            return;
         }
         resolve(val);  
     });
   });

   return promise;
}

module.exports={
    set,
    get
}
