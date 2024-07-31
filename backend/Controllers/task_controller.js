const TaskSchema = require("../models/Task_model");

const create_task_controller = async (req, res, next) => {
  const body = req.body;
  console.log("Received body:", body); // Log incoming data
  try {
    const task = new TaskSchema({
      ...body
    });
    await task.save();
    return res.json({ success: true, data: task });
  } catch (error) {
    console.error("Error in create_task_controller:", error); // Log error
    return next({ message: error.message || "Internal server error!" });
  }
};



const get_task_controller = async(req,res,next)=>{
  try {
    const tasks = await TaskSchema.find()
    res.json(tasks);
} catch (error) {
  return next({ message: error.message || "Internal server error!" });
}
}

const delet_task_controller = async(req,res,next)=>{
  try {
    const taskId = req.params.id;
    const deletedTask = await TaskSchema.findByIdAndDelete(taskId);
    if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', deletedTask });
} catch (error) {
  return next({ message: error.message || "Internal server error!" });
}
}


module.exports = { create_task_controller,get_task_controller ,delet_task_controller};
