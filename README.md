# 原生Node开发博客项目
## 创建项目目录
```
mkdir blog
cd blog
mkdir bin
cd  bin
touch server.js
npm init 
npm install corss-env  --save-dev
```
---
## 配置package.json
> 配置入口文件  和scripts快捷键  npm run dev  ----> nodemon bin/server.js
```
 {
  "name": "blog",
  "version": "1.0.0",
  "description": "教学测试案例",
  "main": "./bin/server.js",
  "scripts": {
    "dev": "nodemon ./bin/server.js"
  },
  "author": "duanli",
  "license": "ISC",
  "devDependencies": {
    "cross-env": "^7.0.2"
  }
}
```
## Promise封装读取文件
```
const  fs=require('fs');
function read(url){
  const promise= new Promise(function(resolve,reject){
      fs.readFile(url,function(err,data){
        if(err){
          reject(err);
        }else{
          resolve(data);
        }
      });
  });
  return promise;
}
read('1.txt').then(function(data){
   console.log(data);
   // return read();
}).then().then().then().then();
// 调用then的时候，如果后面需要继续then，就要返回一个promise对象
```
