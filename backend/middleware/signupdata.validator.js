const emailValidator=require("email-validator")

const signupDataValidate=(req,res,next)=>{
    const {name,username,email,password,dob}=req.body;
    console.log(name,username,email,password,dob)

    ///every field is required
    if(!name || !username || !email ||!password ||!dob){
        return res.json({
            success:false,
            message:"Every field is required"
        })
    }

    //email validator using npm package 

    const validEmail=emailValidator.validate(email);
    if(!validEmail){
        return res.json({
            success:false,
            message:"Please provide a valid email address"
        })
    }
    next()
}

module.exports=signupDataValidate;