{
    let createPost=function(){
        let newPostForm=$("#new-post-form");
        
        newPostForm.submit(function(event){
            event.preventDefault();

            // console.log("default prevented");
            $.ajax({
                url:"/posts/create",
                method:"POST",
                data:newPostForm.serialize(),//convert the data into json
                success:function(data){
                    // console.log(data);
                    let newPost=newPostDom(data.data.post,data.user_name);
                    // console.log(newPost);
                    $(".delete-post-button",newPost).click(deletePostOnClick);
                    $("#posts-list-container ol").prepend(newPost);
                    // $("#home-contianer").append(createNoty(data.successMessage));
                    new Noty({
                        theme:"relax",
                        text: data.successMessage,
                        type:"success",
                        layout:"center",
                        timeout:2500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
            $("#post-text-content").val("");
        });
    };

    //for creating html element
    function newPostDom(post,user_name){
        // console.log("newPostDom called");
        return $(`<li id="post-${post._id}">
            <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}" style="color:red">X</a>
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


    function deletePost(){
        $(".delete-post-button").click(deletePostOnClick);
    }

    function deletePostOnClick(event){
        event.preventDefault();
        $.ajax({
            method:"GET",
            url:$(event.target).prop("href"),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme:"relax",
                    text: data.successMessage,
                    type:"success",
                    layout:"center",
                    timeout:2500
                }).show();
            },
            error:function(err){
                console.log(err);
            }
        })
    }

    function createNoty(message){
        return $(`<script>
                    new Noty({
                        theme:"relax",
                        text: ${message},
                        type:"success",
                        layout:"center",
                        timeout:2500
                    }).show();
                </script>`);
    }

    createPost();
    deletePost();
}