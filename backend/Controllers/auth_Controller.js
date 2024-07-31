const bcrypt = require("bcryptjs");
const { userSchema } = require("../models/User_Model");
const jwt = require("jsonwebtoken");

const Signup_Controller = async (req,res,next)=>{
    try {
        const body = req.body
        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(body.password, salt);
        const new_user = await userSchema.create({
            ...body,
            password: password_hash,
          });
          return res.json({ success: true, data: new_user });
    } catch (error) {
        return next({message: error.message || "Internal server error!" })
        // return res.json
    }
}

const login_controller = async (req, res, next) => {
    try {
      const body = req.body;
      const find_user = await userSchema.findOne({ email: body.email });
  
      if (find_user === null) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials!" });
      }
  
      const compare_password = bcrypt.compareSync(
        body.password,
        find_user.password
      );
  
      if (!compare_password) {
        return next({ status: 401, message: "Invalid credentials!" });
      }
  
      const payload = {
        user_id: find_user._id,
      };
  
      const jwt_token = jwt.sign(payload,process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
  
      find_user.login_count = find_user.login_count + 1;
  
      await find_user.save();
  
      return res.json({ success: true, message: "Logged in Successfully!", access_token: jwt_token });
    } catch (error) {
      return next({ message: error.message || "Internal server error!" });
    }
  };

const check_auth_controller  = async(req,res,next)=>{
try {
    const auth_user = req.user 
    return res.json({messaga:"success",data:auth_user})
} catch (error) {
    return next({ message: error.message || "Internal server error!" });
  
}

  }



const Logout_controller = async(req,res,next)=>{
  const token = req.header('Authorization').replace('Bearer ', '');
  if (token) {
    blacklist.push(token);
    return res.status(200).send('Logout successful');
  }
  return res.status(400).send('No token provided');
}  

module.exports = {Signup_Controller,login_controller,check_auth_controller,Logout_controller}