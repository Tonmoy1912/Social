const Post=require("../models/post").Post;
const Comment=require("../models/comment").Comment;

module.exports.create=function(req,res){
    const func=async function(){
        try{
            const doc=new Post({
                content:req.body.content,
                user:req.user._id
            });
            await Post.insertMany([doc]);
            req.flash("success","Post published!");
            return res.redirect("back");
        }
        catch(err){
            req.flash("error",err);
            // console.log(err);
        }
    };
    func();
}

module.exports.delete=function(req,res){
    const func=async function(){
        try{
            var arr=await Post.find({_id:req.params.id});
            if(arr.length==0){
                req.flash("error","No such post found");
                return res.redirect("back");
            }
            const post=arr[0];
            if(post.user!=req.user.id){
                req.flash("error","Unauthorized");
                return res.redirect("back");
            }
            // await post.delete();
            await Post.deleteMany({_id:req.params.id});
            await Comment.deleteMany({post:req.params.id});
            req.flash("success","Post and associated comments deleted!");
            return res.redirect("back");
        }
        catch(err){
            console.log(err);
        }
    };
    func();
}