const express = require('express')

const router = express.Router()
const {createTask,getAllTasks,getTask,udpateTask,deleteTask}=require('../controllers/taskController')

//Get all tasks
router.get('/',getAllTasks) 

//Get single task
router.get('/:id',getTask) 

//Post new task
router.post('/',createTask) 

//delete task
router.delete('/:id',deleteTask) 

//update task
router.patch('/:id',udpateTask) 



module.exports =router