const User2=require("../models/user");
const User=User2.User;

module.exports.profile=function(req,res){
    if(req.cookies.user_id==undefined){
        //console.log(req.cookies.user_id);
        res.redirect("/users/sign-in");
        return;
    }
    const func=async function(){
        var arr=await User.find({_id:req.cookies.user_id});
        if(arr.length==0){
            res.redirect("/users/sign-in");
            return ;
        }
        var user=arr[0];
        // console.log(user);
        res.render("profile",{title:"User Profile",user:user});
    };

    func();

    // res.render("profile",{title:"User Profile"});
    // return ;
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
        try{
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
        }
        catch(e){
            console.log(e);
        }
    };
    func();
}

//Sign in and create a session for the user
module.exports.createSession=function(req,res){
    const func=async function(){
        try{
            var arr=await User.find({email:req.body.email});
            if(arr.length==0){
                return res.redirect("back");
            }
            var doc=arr[0];
            if(doc.password==req.body.password){
                res.cookie("user_id",doc.id);
                return res.redirect("/users/profile");
            }
            else{
                return res.redirect("back");
            }
        }
        catch(e){
            console.log(e);
        }
    };
    func();
}

//sign out and delete a session
module.exports.deleteSession=function(req,res){
    res.clearCookie("user_id");
    res.redirect("/users/sign-in");
};