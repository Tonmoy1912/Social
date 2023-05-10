module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id",25);
    // res.cookie("extra","blabla");
    // res.cookie("extra2","blahblah");
    res.render("home",{title:"Home"});
    return ;
}