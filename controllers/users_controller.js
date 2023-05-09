module.exports.profile=function(req,res){
    // res.send("<h1>User Profile</h1>");
    res.render("user",{title:"User Profile"});
    return ;
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