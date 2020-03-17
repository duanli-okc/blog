let { login} =require('../controller/user');
let {SuccessModle,ErrorModle }=require('../modle/resModle');
// 处理用户相关的路由
function handleUserRouter(req,res){
    const method=req.method;
    const username=req.query.username;
    const password=req.query.password;
   if(method=="GET" && req.path=='/api/user/login'){
     return  login(username,password).then(function(rows){
       
        let result=rows[0] || {};
        if(result.username){
          // 在客户端设置cookie
          req.session.username=result.username;
          req.session.realname=result.realname;
          return new SuccessModle('登陆成功');
        }else{
          return new ErrorModle('登陆失败');
        }
     });
   } 
   // 登陆测试
   if(method=="GET" && req.path=='/api/user/login-test'){
     console.log(req.session);
     if(req.session.username){
      return Promise.resolve(
        new SuccessModle('成功')
      ); 
     }
      return Promise.resolve(
        new ErrorModle('失败')
      );
     
      
   }
   
}

module.exports = handleUserRouter;