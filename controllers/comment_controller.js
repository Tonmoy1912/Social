const Comment=require("../models/comment").Comment;
const Post=require("../models/post").Post;

module.exports.create=function(req,res){
    const func=async function(){
        try{
            const posts=await Post.find({_id:req.body.post});
            if(posts.length==0){
                req.flash("error","No such post found");
                return res.redirect("/");
            }
            const comment=new Comment({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            await Comment.insertMany([comment]);
            posts[0].comments.push(comment._id);
            await posts[0].save();
            req.flash("success","Comment published!");
            return res.redirect("/");
        }
        catch(err){
            req.flash("error",err);
            res.redirect("back");
        }
    } 
    func();
}

module.exports.destroy=function(req,res){
    const func=async function(){
        try{
            var arr=await Comment.find({_id:req.query.id});
            if(arr.length==0){
                req.flash("error","No such comment found");
                return res.redirect("back");
            }
            const comment=arr[0];
            if(comment.user!=req.user.id&&req.query.postUserId!=req.user.id){
                // console.log("return back");
                req.flash("error","Unauthorized");
                return res.redirect("back");
            }
            const postId=comment.post;
            await Comment.deleteMany({_id:req.query.id});
            await Post.updateMany({_id:postId},{$pull:{comments:req.params.id}});
            req.flash("success","Comment deleted!");
            return res.redirect("back");
        }
        catch(err){
            // console.log(err);
            req.flash("error",err);
            res.redirect("back");
        }
    };
    func();
}