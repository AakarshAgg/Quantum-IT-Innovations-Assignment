const JWT=require("jsonwebtoken")

const jwtAuth=(req,res,next)=>{
    const token = (req.cookies && req.cookies.token)||null

    if(!token){
        return res.json({
            success:false,
            message:"NOT authorized"
        })
    }

    try {
    //verify token
    const payload=JWT.verify(token,process.env.SECRET);
    req.user={id:payload.id,email:payload.email}
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
  next()
}

module.exports=jwtAuth