const User2=require("../models/user");
const User=User2.User;

module.exports.profile=function(req,res){
    // res.send("<h1>User Profile</h1>");
    res.render("profile",{title:"User Profile"});
    return ;
}

module.exports.home=function(req,res){
    res.render("user",{title:"User's Home page"});
    return ;
}

module.exports.post=function(req,res){
    res.render("user",{title:"User's post page"});
    return ;
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    res.render("user_sign_in",{title:"sign in page"});
    return ;
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    res.render("user_sign_up",{title:"sign up page"});
    return ;
}

//get the sign up data
module.exports.create=function(req,res){
    const body=req.body;
    if(body.password!=body.confirm_password){
        return res.redirect("back");
    }
    var func=async function(){
        var obj=await User.find({email:body.email});
        if(obj.length!=0){
            res.redirect("back");
        }
        else{
            var doc=new User(body);
            // console.log(doc);
            await User.insertMany([doc]);
            res.redirect("/users/sign-in");
        }
    };
    func();
}

//Sign in and create a session for the user
module.exports.createSession=function(req,res){
    return res.redirect("/users/profile");
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            // console.log("Error while logging out")
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
}