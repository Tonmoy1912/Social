const express=require('express');
const app=express();
const port=8000;

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to the server\n${err}`);
    }
    else{
        console.log(`Server is running on port : ${port}`);
    }
});