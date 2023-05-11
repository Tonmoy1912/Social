const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Social")
.then(()=>{
    console.log("Successfully connected to database");
})
.catch((err)=>{
    console.log(err);
});

const db=mongoose.connection;

module.exports=db;