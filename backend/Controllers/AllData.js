
const { userSchema } = require("../models/User_Model");




const get_All_users = async(req,res,next)=>{
  try {
    const users = await userSchema.find();
    res.status(200).json(users);
  } catch (error) {
    return next({message: error.message  || "Internal server error!" })
  
  }
}


const get_user_by_id = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return next({ message: error.message || "Internal server error!" });
  }
};



const get_user = async(req,res,next) =>{
try {
  try {
    const userIds = req.query.ids.split(',');
    const users = await userSchema.find({ _id: { $in: userIds } });
    return res.json({success:true,data:users})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  if(!user){
    return res.json({message:"user does not exist"})
  }
  return res.json({success:true,data:user})
  
} catch (error) {
  return next({data:"data does not exist",message: error.message  || "Internal server error!" })
  
}
}



const updateProfileImage = async(req,res,next)=>{

  try {
    const {profileImage} = req.body;
    const userId = req.user._id;
    const user = await userSchema.findById(userId);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    console.log("user",user)
    return res.json({message:"success",user})
  } catch (error) {
    return next({message: error.message  || "Internal server error!" })
    
  }
}


const updateContoller = async(req,res,next)=>{
  try {
    const {full_name,profileImage,phone_number,email} = req.body;
    const userId = req.user._id;
    const user = await userSchema.findById(userId);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.profileImage = profileImage || user.profileImage;
    user.full_name = full_name || user.full_name
    user.phone_number = full_name || user.phone_number
    user.email = full_name || user.email


    await user.save();
    console.log("user",user)
    return res.json({message:"success",user})
  } catch (error) {
    return next({message: error.message  || "Internal server error!" })
    
  }
}



module.exports = {updateProfileImage,get_All_users,updateContoller,get_user_by_id,get_user}