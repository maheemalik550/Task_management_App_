const  {Project} = require('../models/Project')
const create_Project_controller = async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    
    const project = await Project({
      ...body,
      user: user._id,
    });
    
    await project.save();
    
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error("Error creating project:", error);
    return next({ message: error.message || "Internal server error!" });
  }
};



const get_Project_controller = async(req,res,next)=>{
  try {

      const getProject = await Project.find()
    return res.status(201).json({ success: true, data:getProject});
    
} catch (error) {
  return next({ message: error.message || "Internal server error!" });
}
}

const delet_Project_Controller = async(req,res,next)=>{
  try {
    const Project_id = req.params.id;
    const deletedTask = await Project_Schema.findByIdAndDelete(Project_id);
    if (!deletedTask) {
      return next({ message: error.message || "Project not found!" });
    }
    res.json({ message: 'Task deleted successfully', deletedTask });
} catch (error) {
  return next({ message: error.message || "Internal server error!" });
}
}

module.exports = { create_Project_controller,get_Project_controller ,delet_Project_Controller};
