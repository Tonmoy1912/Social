const User2=require("../models/user");
const User=User2.User;

module.exports.profile=function(req,res){
    // res.send("<h1>User Profile</h1>");
    const func=async function(){
        try{
            var arr=await User.find({_id:req.params.id});
            if(arr.length==0){
                return res.redirect("/");
            }
            res.render("profile",{title:"User Profile",profile_user:arr[0]});
            return ;
        }
        catch(err){
            console.log(err);
        }
    };
    func();
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
        return res.redirect("/");
    }
    res.render("user_sign_in",{title:"sign in page"});
    return ;
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    res.render("user_sign_up",{title:"sign up page"});
    return ;
}

//get the sign up data
module.exports.create=function(req,res){
    const body=req.body;
    if(body.password!=body.confirm_password){
        req.flash("error","Confirm password is not matching");
        return res.redirect("back");
    }
    var func=async function(){
        var obj=await User.find({email:body.email});
        if(obj.length!=0){
            req.flash("error","The email is already exist");
            res.redirect("back");
        }
        else{
            var doc=new User(body);
            // console.log(doc);
            await User.insertMany([doc]);
            req.flash("success","You have successfully signed up");
            res.redirect("/users/sign-in");
        }
    };
    func();
}

module.exports.update=function(req,res){
    const func=async function(){
        try{
            if(req.user.id!=req.params.id){
                // return res.status(401).send("Unauthorized");
                req.flash("error","Unauthorized");
                return res.redirect("back");
            }
            var arr=await User.find({email:req.body.email});
            if(arr.length==1){
                if(arr[0].id!=req.params.id){
                    // return res.status(401).send("Enter a unique email");
                    req.flash("error","Enter a unique email");
                    return res.redirect("back");
                }
                
            }
            await User.updateMany({_id:req.params.id},{$set:{name:req.body.name,email:req.body.email}});
            req.flash("success","Updation successful");
            return res.redirect("back");
        }
        catch(err){
            console.log(err);
        }
    };
    func();
};

//Sign in and create a session for the user
module.exports.createSession=function(req,res){
    req.flash("success","Logged in Successfully");
    return res.redirect("/");
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            // console.log("Error while logging out")
            req.flash("error","Failed to log out");
            console.log(err);
        }
        else{
            req.flash("success","You have logged out!");
            res.redirect("/");
        }
    });
}