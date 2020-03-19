// 获取博客列表
const query_sql=require('../db/mysql');
function getList(author,keyword){

   let sql= `select * from blogs where 2=2 `;
   if(author){
       sql+=`and username=${author} `;
   }
   if(keyword){
       sql+= `and title like '%${keyword}%' `
   }
   sql+= `order by id desc`
  return query_sql(sql)  
}
// 获取博客详情
function getDetail(id){
    sql=`select * from blogs where id=${id}`
    return query_sql(sql);
}
// 新增一条博客  返回值 insertId
function  addBolg (req){
    let title=req.query.title;
    let content = req.query.content;
        
    let author=req.session.username; // 这是是假数据，后期替换, 作者是存到服务端
    let createTime=Date.now(); // 时间戳
    let sql= `insert into blogs (title,content,createTime,author) values ('${title}','${content}',${createTime},'${author}')`
    return query_sql(sql);
}
// 更新一篇博客
function updateBlog(postData){
    let id=postData.id;
    let title=postData.title;
    let content=postData.content;
    let sql=`update blogs set title='${title}',content='${content}' where id=${id}`
    return query_sql(sql).then(function(updataData){
        if(updataData.changedRows>0){
           return true;
        }
        return false;
    })
        
    
}
// 删除一篇博客
function delBlog(id,author){
   let sql = `delete from blogs where id=${id} and author='${author}'`;
  return  query_sql(sql).then(function(delDate){
      if(delDate.affectedRows>0){
          return true;
      }else{
          return false;
      }
  });
}

module.exports={
    getList,
    getDetail,
    delBlog,
    updateBlog,
    addBolg
}