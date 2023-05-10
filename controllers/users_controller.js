const User2=require("../models/user");
const User=User2.User;

module.exports.profile=function(req,res){
    // res.send("<h1>User Profile</h1>");
    res.render("user",{title:"User Profile"});
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
    res.render("user_sign_in",{title:"sign in page"});
    return ;
}

module.exports.signUp=function(req,res){
    res.render("user_sign_up",{title:"sign out page"});
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
    //todo later
}