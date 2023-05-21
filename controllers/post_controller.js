const Post=require("../models/post").Post;

module.exports.create=function(req,res){
    const func=async function(){
        try{
            const doc=new Post({
                content:req.body.content,
                user:req.user._id
            });
            await Post.insertMany([doc]);
            return res.redirect("back");
        }
        catch(err){
            console.log(err);
        }
    };
    func();
}

