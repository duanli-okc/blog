// function fn1(a){
//   let primose=new Promise(function(resolve,reject){
//       if(a>10){
//         resolve(a);
//       }
//   });
//   return primose;
// }

//   fn1(12).then(function(data){
//     return  data+10;
//   }).then(function(data){
//    return  console.log(data);
//   })

//   // Promise1.then(function(data){
//   //    console.log(data);
//   // });

//   // then 函数return时 有会创建一个新的promise对象

//   // 文件流的读取
//   const fs=require('fs');
//   const path=require('path');
//         filename1=path.resolve(__dirname,'1.txt');
//         filename2=path.resolve(__dirname,'2.txt');
//   const readStream=fs.createReadStream(filename1);
//   const writeStream=fs.createWriteStream(filename2);
//   readStream.pipe(writeStream);
let {get,set} = require('./src/db/redis');

set('password','123');

get('password').then(function(val){
  console.log(val);
});


