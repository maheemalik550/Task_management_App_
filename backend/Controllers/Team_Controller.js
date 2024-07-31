const { TeamSchema } = require("../models/TeamModel");


const create_Team_controller = async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user; 
    const newTask = new TeamSchema({
      ...body,
      user: user._id, 
    });
   const createdTask = await newTask.save();
    if (!createdTask) {
      return next({ status: 404, message: "Task creation failed!" });
    }
    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    return next({ message: error.message || "Internal server error!" });
    
};
}


const get_Team_by_id = async (req, res, next) => {
  try {
    const team = await TeamSchema.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    return res.json({success:true,data:team})
  }
   catch (error) {
    return next({ message: error.message || "Internal server error!" });
    
};
}

const get_team_controller = async(req,res,next)=>{
  try {
     const team = await TeamSchema.find()
      if (!team) {
          return next({ message: error.message || "Internal server error!" });
      }
      return res.json({success:true,data:team})
    } catch (error) {
      return next({ message: error.message || "Internal server error!" });
    }
}


const update_team = async(req,res,next)=>{
    try {
        const team = await TeamSchema.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!team) {
            return next({ message: error.message || "Internal server error!" });
        }
        res.send(team);
      } catch (error) {
        return next({ message: error.message || "Internal server error!" });
      }
}
const delet_team =  async(req,res,next)=>{
    try {
        const team = await TeamSchema.findByIdAndDelete(req.params.id);
        if (!team) {
            return next({ message: error.message || "Internal server error!" });
        }
        res.send(team);
      } catch (error) {
        return next({ message: error.message || "Internal server error!" });
      }
}

module.exports = {create_Team_controller,get_team_controller,update_team,delet_team,get_Team_by_id}