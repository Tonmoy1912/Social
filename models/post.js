const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the array of ids of comments in this post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
});

const Post=new mongoose.model("Post",postSchema);

module.exports.Post=Post;