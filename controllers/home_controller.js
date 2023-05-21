const Post=require("../models/post").Post;

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id",25);
    // res.cookie("extra","blabla");
    // res.cookie("extra2","blahblah");
    const func=async function(){
        try{
            const posts=await Post.find({user:req.user._id}).populate("user");
            res.render("home",{title:"Home",posts:posts});
        }
        catch(err){
            console.log(err);
        }
    }
    func();
    // res.render("home",{title:"Home"});
    // return ;
}