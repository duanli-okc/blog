// 存在blog路由相关内容
function handleBlogRouter(req,res){
    const method = req.method;
   if(method=='GET' && req.path=='/api/blog/list'){
       // 向数据库获取博客信息  sql
       console.log(req.query); 
       return {
           id:'1',
           title:'标题1',
           content:'内容',
           time:'2353425345'
       }
   } 
   if(method=='GET' && req.path=='/api/blog/detail'){
    // 向数据库获取博客信息  sql
    return {
        id:'1',
        title:'标题1',
        content:'详情内容XXXXXXXXXXXXX',
        time:'2353425345'
    }
   }
}

module.exports={
    handleBlogRouter
}