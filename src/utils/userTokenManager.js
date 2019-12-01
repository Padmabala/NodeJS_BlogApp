const jwt=require("jsonwebtoken");

const userTokenGenerator=({
    id="",
    email="",
    firstName="",
    lastName=""
}={})=>{
    const token=jwt.sign({
        sub:"user",
        id,
        email,
        firstName,
        lastName
    },
    process.env.JWT_KEY,
    {
        expiresIn:"5 years"
    });
    return token;
}
const userTokenValidator=(token="")=>{
    try{
        const data=jwt.verify(token,process.env.JWT_KEY);
        return data;
    }
    catch(err){
        console.error;
        return false;
    }
}
exports.userTokenGenerator=userTokenGenerator;
exports.userTokenValidator=userTokenValidator;