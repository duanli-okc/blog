// 获取博客列表
function getList(author,keyword){
    // let sql='select * from blog where author=duanli and keyword=js'
    // sql  db.query(sql,function(){
           
   // });
   if(author=='duanli'&& keyword=='js'){
        let dataList={
        id:'1',
        title:'标题1',
        content:'内容',
        time:'2353425345'
        }
        return dataList;
      }
      else{
          return false;
      }
   }
// 获取博客详情
function getDetail(id){
   // sql='select content from blog where id=id'
   if(id=='1'){
    return {
        id:'1',
        title:'标题1',
        content:'详情内容XXXXXXXXXXXXX',
        time:'2353425345'
       }
   }else{
       return false;
   }
}

module.exports={
    getList,
    getDetail
}