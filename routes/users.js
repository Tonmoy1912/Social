const express=require("express");
const router=express.Router();
const userController=require("../controllers/users_controller");

router.get("/profile",userController.profile);
router.get("/",userController.home);
router.get("/posts",userController.home);

module.exports=router;