const express=require('express');
const {User}=require("../models/Users");
const {compareHash}=require("../utils/hash");
const {userTokenGenerator,userTokenValidator}=require("../utils/userTokenManager");
const userAuth=require("../middleware/userAuth");
const userRouter=express.Router();
userRouter.route("/login")
.get((req,res)=>{
    console.log(req.cookies);
    const {jwt=""}=req.cookies;
    const user=userTokenValidator(jwt);
    if(user){
        res.render("login-form",
        {
            layout:"login"
        });
    }
    else{
        res.render("login-form",
        {
            layout:"login"
        });
    }
})
.post((req,res)=>{
    console.log(req.body);
    const {email="",password=""}=req.body;//always ha node single threaded..single prob entire app is crashed since single threaded..always have default values
    User.findOne({
        where:{
            email,
        }
    })
    .then(userInstance=>{
        if(userInstance){
            const user=userInstance.get();
            const {id="",email:emailFromDb="",password:passwordFromDb="",firstName="",lastName=""}=user;//there is email const abv too..coz it is in sublevel it takes sep values
            compareHash(password,passwordFromDb) //this does not work if password is hashed
            .then(isSuccess=>{
                if(isSuccess){
                    const jwtToken=userTokenGenerator({
                        id,
                        email:emailFromDb,
                        firstName,
                        lastName
                    })
                    res.cookie('jwt',jwtToken,{httpOnly:true});
                    res.status(200).send("Logged In");
                }
                else{
                    res.status(400).send("No User Found wohoo");
                }

            })
            .catch(error=>{
                console.error(error);
                res.status(500).send("Internal Server Error");
            })
        }
        else{
            res.status(400).send("No User Found");
        }
    })
    .catch(console.error);

    
})
userRouter.route("/profile")
.get(userAuth,(req,res)=>{
    res.send(req.user.firstName+"'s profile");
})

userRouter.route("/logout")
.get(userAuth,(req,res)=>{
    console.log(req.user);
    //res.set("key",req.user);
    res.clearCookie(req.user.jwt,{path:'/'});
})
module.exports=userRouter;