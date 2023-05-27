{
    let createPost=function(){
        let newPostForm=$("#new-post-form");
        
        newPostForm.submit(function(event){
            event.preventDefault();

            console.log("default prevented");
            $.ajax({
                url:"/posts/create",
                method:"POST",
                data:newPostForm.serialize(),//convert the data into json
                success:function(data){
                    // console.log(data);
                    let newPost=newPostDom(data.data.post,data.user_name);
                    // console.log(newPost);
                    $("#posts-list-container ol").prepend(newPost);
                    // newPost.appendTo("#post-list-container ul");
                    // console.log("append called");
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
            $("#post-text-content").val("");
        });
    };

    createPost();

    //for creating html element
    function newPostDom(post,user_name){
        // console.log("newPostDom called");
        return $(`<li id="post-${post._id}">
            <p>
                    <small>
                        <a class="delete-post-botton" href="/posts/destroy/${post._id}" style="color:red">X</a>
                    </small>
                <!-- <li> -->
                    ${post.content}
                <!-- </li> -->
                <br>
                <small>
                    -${user_name}
                </small>
            </p>
            <div class="post-comments">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type here to add comment" required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
        
                <div class="post-commets-list">
                    
                </div>
            </div>
        </li>`);
    };
}