//处理http 请求和响应
const handleBlogRouter=require('./src/router/blog');
const handleUserRouter=require('./src/router/user');
const querystring= require('querystring');

// 封装promise 获取 post提交的数据
function getPostDate(req){
  const method=req.method;
  const promise=new Promise(function(resolve,reject){
     if(method !== "POST"){
      resolve({});
      return;
     }
     // 客户端post发送数据的时候，只能发送json数据
     if(req.headers['content-type']!== 'application/json'){
        resolve({});
        return;
     }
     var postData=''; 
     req.on('data',function(data){
        postData+=data;
     });
     req.on('end',function(){
        if(!postData){
           resolve({});  
           return;
        }
        resolve(JSON.parse(postData));
     });

  });
  return promise;
}

function handleServer (req,res){
   res.setHeader('Content-type','application/json');
   const method=req.method;
   req.path= req.url.split('?')[0];  // /api/blog/list
   // get数据
   req.query=querystring.parse( req.url.split('?')[1] );

   // cookie解析 
   req.cookie={};   
   let cookieStr= req.headers.cookie || ''  // username=duanli; duanli=111 
   let arr1=cookieStr.split('; '); // [username=duanli, duanli=111]
       for(var i=0; i<arr1.length;i++){
         var arr2=arr1[i].split('=');   // [username,duanli] 
         req.cookie[arr2[0]]=arr2[1];
       }
   let  SESSION_DATA={};
   // session解析
   let needSetCookie=false;
   let userId=req.cookie.userId;
   if(userId){
     if(!SESSION_DATA[userId]){
        SESSION_DATA[userId]={};
     } 
   }else{
      needSetCookie=true;
      userId=`${Date.now()}_${Math.random()}`
      SESSION_DATA[userId]={} // 初始化一个空对象，当登陆成功，向里面存用户信息
   }
   req.session=SESSION_DATA.userId;
  
   

   getPostDate(req).then(function(postData){
         // post数据 
         req.body=postData; 
         // 处理博客请求
         const blogData=handleBlogRouter(req,res);
         if(blogData){
            blogData.then(function(data){
               if(data){
                  res.setHeader('Set-Cookie',`userId=${userId};path=/;httpOnly`);
                  res.end(JSON.stringify(data));
               }
            });
            return;
         }
         
         // 处理用户（登陆，注册）
         const userDate=handleUserRouter(req,res);
         if(userDate){
            userDate.then(function(data){
               if(data){
                  res.setHeader('Set-Cookie',`userId=${userId};path=/;httpOnly`);
                  res.end( JSON.stringify(data));
               }
            });
            return;
         }
         // 不存在的接口
         res.writeHead('404',{'Content-type':'text/plain'});
         res.write('404 not found');
         res.end();
      
   });

}

module.exports = handleServer;


  



