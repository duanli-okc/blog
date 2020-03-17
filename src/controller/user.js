const query_sql=require('../db/mysql');
function login(username,password){
   
   let sql=`select username,realname from users where username='${username}' and password='${password}'`
   return  query_sql(sql); 
}


module.exports ={
    login
}