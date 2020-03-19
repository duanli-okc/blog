let MySQL_CONFIG;
let REDIS_CONFIG;
if(process.env.NODE_ENV=='dev'){
    MySQL_CONFIG={
        host     : 'localhost',
        user     : 'root',
        password : '123456789',
        database : 'blog',
        port:'3306'
      }
    REDIS_CONFIG = {
        port:'6379',
        host:'127.0.0.1'
    }
    
}

// if(process.env.NODE_ENV=='product'){
//     MySQL_CONFIG={
//         host     : 'localhost',
//         user     : 'root',
//         password : '123456789',
//         database : 'blog1',
//         port:'3306'
//       } 
// }
module.exports= {
  MySQL_CONFIG,
  REDIS_CONFIG
};