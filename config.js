const mysql=require("mysql");
const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demoproject',
});

con.connect((err)=>{
 if(err){
    console.warn("Error in connection");
 }
})

module.exports = con;