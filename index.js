const express=require('express');
const expressLayouts=require("express-ejs-layouts");
const path=require("path");
const cookieParser=require("cookie-parser");
//used for session cookie
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");
const MongoStore=require("connect-mongo");


const app=express();
const port=8000;

const db=require("./config/mongoose");
const User=require("./models/user");

app.set('view engine','ejs');
app.set('views',"./views");

app.use(expressLayouts);
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"assets")));
//mongpstore is used to store session cookie in db
app.use(session({
    name:"social",
    //TODO change the secret before deployment in production mode
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
        {
            mongoUrl:"mongodb://127.0.0.1:27017/Social",
            mongooseConnection:db,
            autoRemove:"disabled"
        },
        function(err){
            console.log(err||"connect-mongodb setup ok");
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require("./routes"));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to the server\n${err}`);
    }
    else{
        console.log(`Server is running on port : ${port}`);
    }
});