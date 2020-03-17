// 存在blog路由相关内容  
const {SuccessModle,ErrorModle}  = require('../modle/resModle');
const { getList,getDetail,addBolg,updateBlog,delBlog} =require('../controller/getBlog');
function handleBlogRouter(req,res){
    const method = req.method;
   // 请求博客列表
   if(method=='GET' && req.path=='/api/blog/list'){
       // 向数据库获取博客信息  sql  id 
      let {author,keyword}=req.query;
      let dataList=getList(author,keyword);
     return  dataList.then(function(data){
        if(data.length !=0){
          return  new SuccessModle(data,'获取博客列表成功');
        }else{
          return new ErrorModle('获取失败');
        }
      });

   } 
   // 获取博客详情
   if(method=='GET' && req.path=='/api/blog/detail'){
     // 向数据库获取博客信息  sql
     // select * from bolg where id=X;
     let {id}= req.query;
     let blogDetail=getDetail(id);
     return   blogDetail.then(function(detailData){
            if(detailData){
              console.log(detailData);
              return new SuccessModle(detailData,'获取博客信息成功');
            }else{
              return  new ErrorModle('获取失败');
            }
         });  
   }
   
 // 新增一篇博客
   if(method=='POST' && req.path=='/api/blog/new'){
      
     let  addBlogData=addBolg(req);
     
     return  addBlogData.then(function(addData){
      if(addData.affectedRows>0){
         
         return new SuccessModle({id:addData.insertId},'添加博客成功'); 
      }else{
        return new ErrorModle('添加博客失败');
      }
     });
     
   }

   // 更新一篇博客
   if(method=='POST' && req.path=='/api/blog/update'){
    
    let updataBlogData=updateBlog(req.body);
    return  updataBlogData.then(function(result){
            if(result){
              return new SuccessModle('更新博客成功');
            }else{
              return new ErrorModle('更新博客失败');
            }
        });
   }

   // 删除一篇博客
   if(method=='POST' && req.path=='/api/blog/del'){ 
    let id=req.body.id;
    let author = 'zhangsan'// 假数据, 作者从服务获取
    let DelBlogData=delBlog(id,author);
    return DelBlogData.then(function(result){
      if(result){
        return new SuccessModle('删除博客成功');
      }else{
        return new ErrorModle('删除博客失败');
      }
    })
   }

}

module.exports=handleBlogRouter







