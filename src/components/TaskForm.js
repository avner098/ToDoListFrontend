import { useContext, useState } from "react"
import { TasksContext } from "../context/TaskContext"

const TaskForm = ()=>{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [status,setStatus] = useState('')
    const [finish_date,setFinish_date] = useState('')
    const [err,setErr] = useState(null)
    const {dispatch} =useContext(TasksContext)


    const submitHandler = async(e)=>{
        e.preventDefault()

        const task={title,content,status,finish_date}
        const res = await fetch('/tasks',{method:'POST', body: JSON.stringify(task),headers:{'Content-Type': 'application/json'}})
        //back from server
        const json =await res.json()
        if(!res.ok){
            setErr(json.error)
        }
        if(res.ok){
            setErr(null)
            setTitle('')
            setContent('')
            setStatus('')
            setFinish_date('')
            dispatch({type:'CREATE_TASK',payload:json})
            console.log('new task added',json)
        }
    }

   return(

    <form className="create" onSubmit={submitHandler}>
        <h2>Add New Task</h2>
        <label>Task Title:</label>
        <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title}></input>

        <label>Task content:</label>
        <input type="text" onChange={(e)=> setContent(e.target.value)} value={content}></input>

        <label>Task status:</label>
        <input type="text" onChange={(e)=> setStatus(e.target.value)} value={status}></input>

        <label>Task finish_date:</label>
        <input type="text" onChange={(e)=> setFinish_date(e.target.value)} value={finish_date}></input>

        <button>Add Task</button>
        {err && <div className="error">{err}</div>}
    </form>

   )
}

export default TaskForm