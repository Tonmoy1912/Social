const { response } = require("express");
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/user").User;


//authentication using passport
passport.use(new LocalStrategy({
        usernameField:"email",
        passReqToCallback:true
    },
    function(req,email,password,done){
        //find a user and establish the identity
        const func=async function(){
            try{
                var arr=await User.find({email:email});
                if(arr.length==0){
                    // console.log("User is not found");
                    req.flash("error","Invalid email/password");
                    return done(null,false);
                }
                var doc=arr[0];
                if(doc.password!=password){
                    // console.log("Password doesn't match");
                    req.flash("error","Invalid email/password");
                    return done(null,false);
                }
                // console.log("User is authenticated");
                return done(null,doc);
            }
            catch(err){
                // console.log("Error in finding user");
                req.flash("error",err);
                return done(err);
            }
        };
        func();
    }

));


//serialize the user to decide which key to be kept in the cookies
passport.serializeUser(function(user,done){
    return done(null,user.id);
});


//deserialize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    const func=async function(){
        try{
            var arr=await User.find({_id:id});
            return done(null,arr[0]);
        }
        catch(err){
            return done(err);
        }
    };
    func();
});


passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect("/users/sign-in");
    }
};


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
};


module.exports=passport;