module.exports.home=function(req,res){
    // return res.send("<h1>Express is up for Social</h1>")
    res.render("home",{title:"Home"});
    return ;
}