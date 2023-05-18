import { useContext, useEffect } from "react"

import TaskDet from '../components/TaskDet'
import TaskForm from '../components/TaskForm'
import { TasksContext } from "../context/TaskContext"

const Home =()=>{
    const {tasks,dispatch} =useContext(TasksContext)
    useEffect(()=>{
        //get tasks from db 
        const fetchTask=async ()=>{
            const res = await fetch('/tasks')
            const json= await res.json()

            if(res.ok){
                dispatch({type:'SET_TASKS',payload: json})
            }
        }
        fetchTask()
    },[dispatch])

    return (
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task)=>(
                    <TaskDet key={task._id} task={task} />
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home