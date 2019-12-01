const {userTokenValidator}=require("../utils/userTokenManager")
const userAuth=(req,res,next)=>{
    const {jwt=""}=req.cookies;
    const user=userTokenValidator(jwt);
    if(user){
        //res.redirect("/");
        req.user=user; //for the next function to know abt the current user
        req.jwt=jwt;
        next();
    }
    else{
        res.redirect("/user/login");
    }
}

module.exports=userAuth;