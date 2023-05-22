const TaskModel=require('../models/taskModel')
const mongoose =require('mongoose')
//get all tasks
const getAllTasks=async(req,res)=>{
    const tasks=await TaskModel.find({}).sort({createdAt:-1})
    res.status(200).json(tasks)
}

//get task

const getTask= async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }
    const task= await TaskModel.findById(id)
    if(!task){
        return res.status(400).json({error: "no avaible task"})
    }

    res.status(200).json(task)
}

//create task
const createTask=async(req,res)=>{
    const {title,content,status,finish_date}=req.body
    try{
        const task=await TaskModel.create({title,content,status,finish_date})
        res.status(200).json(task)
    }catch(err){
        res.status(400).json({error:"Please fill all the fields"})
    }
}

//delete task
const deleteTask=async(req,res)=>{
    const {id}=req.params   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }
    const task = await TaskModel.findOneAndDelete({_id:id})
    if(!task){
        return res.status(400).json({error: "no avaible task"})
    }

    res.status(200).json(task)
   
}

//update task
const udpateTask=async(req,res)=>{
    const {id}=req.params   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }
    const task=await TaskModel.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!task){
        return res.status(400).json({error: "no avaible task"})
    }
    res.status(200).json(task)

    
}


module.exports={
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    udpateTask
}