const express = require("express");
const {Signup_Controller, login_controller, check_auth_controller, Logout_controller} = require("../Controllers/auth_Controller");
const check_auth_middleware = require("../middleware/check_auth_middleware");
const { get_All_users, updateProfileImage, updateContoller, get_user, get_user_by_id  } = require("../Controllers/AllData");
const { create_task_controller, get_task_controller, delet_task_controller } = require("../Controllers/task_controller");
const { create_Project_controller, get_Project_controller, delet_Project_Controller } = require("../Controllers/Project_Controller");
const { create_task_assignment, get_task_assignment, update_task_assignment, delet_task_assignment } = require("../Controllers/Task_Assignment_controller");
const {create_Team_controller, get_team_controller, update_team, delet_team, get_Team_by_id } = require("../Controllers/Team_Controller");

const router = express.Router()
router.post("/Signup",Signup_Controller)
router.post("/Login",login_controller)




router.use(check_auth_middleware)

router.get("/auth",check_auth_controller)
router.get("/auth",Logout_controller)

router.get("/users",get_All_users)
router.get("/users/:id",get_user_by_id)

router.get("/teamUser",get_user)
router.post("/update",updateProfileImage)
router.post("/updateprofile",updateContoller)

// task
router.post('/task',create_task_controller);
router.delete('/task/:id',delet_task_controller)
router.get('/gettask',get_task_controller)
// project
router.post('/Project',create_Project_controller)
router.get('/getProject',get_Project_controller)

router.delete('/Project/:id',delet_Project_Controller)
// task assignment
router.post('/taskAssig',create_task_assignment)
router.get('/taskAssig/:id',get_task_assignment)
router.put('taskAssig/:id',update_task_assignment)
router.delete('taskAssig/:id',delet_task_assignment)
// team 
router.post('/team',create_Team_controller)
router.get('/team/:id',get_Team_by_id)
router.get('/',get_team_controller)
router.put('/team/:id',update_team)
router.delete('/team/:id',delet_team)














module.exports = router