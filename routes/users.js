const express=require("express");
const router=express.Router();
const userController=require("../controllers/users_controller");

router.get("/profile",userController.profile);
router.get("/",userController.home);
router.get("/posts",userController.post);
router.get("/sign-in",userController.signIn);
router.get("/sign-up",userController.signUp);
router.get("/delete-session",userController.deleteSession);
router.post("/create",userController.create);
router.post("/create-session",userController.createSession);

module.exports=router;