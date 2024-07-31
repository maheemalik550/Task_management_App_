
const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/User_Model");



const check_auth_middleware = async(req,res,next)=>{
   try{
    const headerToken = req.headers.authorization
    if(!headerToken){
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized user" });
      }
    const auth_token = headerToken.split(' ')[1]
    const verify_token = jwt.verify(auth_token,process.env.JWT_SECRET_KEY);
    console.log("verify token",verify_token)
    if (!verify_token) {
        // If verification fails, sending an unauthorized status code and message
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized user" });
      }
      const user_id = verify_token.user_id;
      const find_user = await userSchema.findById(user_id).select('-password');
      req.user = find_user;
    return next()
   
} catch (error) {
    // Handling any errors that occur during the authentication process
   return res.status(500).json({ success: false, message: "Internal server error!" });
  }
}


module.exports = check_auth_middleware