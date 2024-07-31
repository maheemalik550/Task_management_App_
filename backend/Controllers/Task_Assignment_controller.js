// Create Task Assignment

const Task_Assignment_Schema = require("../models/Task_Assignment_Model");


const create_task_assignment = async(req,res,next)=>{
    const body = req.body
    const taskAssignment = new Task_Assignment_Schema(body);
    try {
      await taskAssignment.save();
      res.status(201).send(taskAssignment);
    } catch (error) {
        return next({ message: error.message || "Internal server error!" });
    }
}
  
  // Get Task Assignment
  const get_task_assignment = async(req,res,next)=>{
    try {
        const taskAssignment = await Task_Assignment_Schema.findById(req.params.id);
        if (!taskAssignment) {
            return next({ message: error.message || "Internal server error!" });
        }
        res.send(taskAssignment);
      } catch (error) {
        return next({ message: error.message || "Internal server error!" });
      }
}
  
  // Update Task Assignment
  const update_task_assignment = async(req,res,next)=>{
    try {
        const taskAssignment = await Task_Assignment_Schema.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!taskAssignment) {
            return next({ message: error.message || "Internal server error!" });
        }
        res.send(taskAssignment);
      } catch (error) {
        return next({ message: error.message || "Internal server error!" });
      }
}
  
  // Delete Task Assignment
  const delet_task_assignment = async(req,res,next)=>{
    try {
        const taskAssignment = await Task_Assignment_Schema.findByIdAndDelete(req.params.id);
        if (!taskAssignment) {
            return next({ message: error.message || "Internal server error!" });
        }
        res.send(taskAssignment);
      } catch (error) {
        return next({ message: error.message || "Internal server error!" });
      }
}


module.exports = {delet_task_assignment,update_task_assignment,get_task_assignment,create_task_assignment}