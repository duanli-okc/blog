//处理http 请求和响应
const Router=require('./src/router/blog');
const querystring= require('querystring');
function handleServer (req,res){
   const method=req.method;
   req.path= req.url.split('?')[0];
   res.setHeader('Content-type','application/json');
   req.query=querystring.parse( req.url.split('?')[1] ); 
    
  
   // 处理博客列表请求
   const blogData=Router.handleBlogRouter(req,res);
   res.end(JSON.stringify(blogData));

}

module.exports = handleServer;


// 业务模块抽离 : 一个模块做一类事  


