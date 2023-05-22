const Comment=require("../models/comment").Comment;
const Post=require("../models/post").Post;

module.exports.create=function(req,res){
    const func=async function(){
        const posts=await Post.find({_id:req.body.post});
        if(posts.length==0){
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
        return res.redirect("/");
    } 
    func();
}