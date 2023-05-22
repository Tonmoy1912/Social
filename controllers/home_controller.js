const Post=require("../models/post").Post;

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id",25);
    // res.cookie("extra","blabla");
    // res.cookie("extra2","blahblah");
    const func1=async function(){
        try{
            const posts=await Post.find({user:req.user._id}).populate("user");
            res.render("home",{title:"Home",posts:posts});
        }
        catch(err){
            console.log(err);
        }
    }
    const func2=async function(){
        try{
            const posts=await Post.find({})
            .populate("user")
            .populate({
                path:"comments",
                populate:{
                    path:"user"
                }
            });
            res.render("home",{title:"Home",posts:posts});
        }
        catch(err){
            console.log(err);
        }
    }
    // if(req.isAuthenticated()){
    //     func1();
    // }
    // else{
        func2();
    // }
    
    // res.render("home",{title:"Home"});
    // return ;
}