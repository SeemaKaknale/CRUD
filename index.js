const express=require("express");
const app = express();
const con = require("./config");   //database connection

app.use(express.json());   //it is a middleware 

app.get("/",(req,res)=>{

    con.query("select * from product",(err,result)=>{
        if(err){
            res.send("error");
        }else{
            res.send(result);
        }
    })
   
});

app.post("/addData",(req,res)=>{
    let newProduct = { ...req.body };
    console.log(newProduct);
    con.query("INSERT INTO product SET ?",newProduct,(err,result)=>{
        if(err){
            return res.status(500).json({ status: "ERROR", error });
        }else{
            return res.status(200).json({ status: "SUCCESS" });
        }
    })
   
});

app.put('/updateData/:id',(req, res)=> {
    console.log(req.params.id);
    let updateProduct = { ...req.body };
    console.log(updateProduct);
                 // con.query("UPDATE product set product_title=? ,product_description=? ,product_price=? ,subcategory_id=? where id =? ",[updateProduct.product_title,updateProduct.product_description,updateProduct.product_price,updateProduct.subcategory_id,req.params.id],(err,result)=>{
        con.query("UPDATE product set ? where id=?",[updateProduct,req.params.id],(err,result)=>{
        if(err){
            return res.status(500).json({ status: "ERROR", error });
        }else{
            return res.status(200).json({ status: "SUCCESS" });
        }
    }) 
});

app.delete('/deleteData/:id',(req, res)=> {
    console.log(req.params.id);
        con.query("delete from product where id=?",[req.params.id],(err,result)=>{
        if(err){
            return res.status(500).json({ status: "ERROR", error });
        }else{
            return res.status(200).json({ status: "SUCCESS" });
        }
    }) 
});

app.listen(3001,()=>{
    console.log("running on port 3001");
});