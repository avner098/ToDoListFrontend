import { useContext } from "react"
import { TasksContext } from "../context/TaskContext"

const TaskDet =({task})=>{
const {dispatch} =useContext(TasksContext)
const handleDelete= async() =>{
    const res = await fetch("/tasks/"+task._id,{method: 'DELETE'})
    //the obj i delete
    const json = await res.json()
    if(res.ok){
        dispatch({type:'DELETE_TASK',payload:json})
    }

}

const handleEdit= async() =>{
    const res = await fetch("/tasks/"+task._id,{method: 'DELETE'})
    //the obj i delete
    const json = await res.json()
    if(res.ok){
        dispatch({type:'DELETE_TASK',payload:json})
    }

}

    return(
        <div className="taskDet">
           <h3>{task.title}</h3> 
           <p><strong>Content: </strong> {task.content}</p>
           <p><strong>Status: </strong> {task.status}</p>
           <p><strong>Finsish date: </strong> {task.finish_date}</p>
           <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
           <span id="edit" className="material-symbols-outlined" onClick={handleEdit}>edit</span>
        </div>
    )
}


export default TaskDet