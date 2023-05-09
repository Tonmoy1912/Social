const express=require('express');
const expressLayouts=require("express-ejs-layouts");
const path=require("path");
const app=express();
const port=8000;

app.set('view engine','ejs');
app.set('views',"./views");

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"assets")));
app.use('/',require("./routes"));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to the server\n${err}`);
    }
    else{
        console.log(`Server is running on port : ${port}`);
    }
});