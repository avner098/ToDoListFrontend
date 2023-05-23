import { useContext, useState } from "react"
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"

const TaskForm = ()=>{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [status,setStatus] = useState('')
    const [finish_date,setFinish_date] = useState('')
    const [err,setErr] = useState(null)
    const {dispatch} =useContext(TasksContext)
    const {user} = useContext(AuthContext);

    const submitHandler = async(e)=>{
        e.preventDefault()
    

        if(!user){
            return
        }
        const task={title,content,status,finish_date}
        const res = await fetch('/api/tasks/',{ 
            method:'POST',
            body: JSON.stringify(task),
            headers:{
                'Content-Type': 'application/json',
                'Autthorization' : `Bearer ${user.token}`
            }
        })
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
        
        <select  onChange={(e)=> setStatus(e.target.value)} value={status}>
        <option>Disactive</option>
        <option>Active</option>
        </select>

        <label>Task completion date:</label>
        <input type="date" onChange={(e)=> setFinish_date(e.target.value)} value={finish_date}></input>

        <button>Add Task</button>
        {err && <div className="error">{err}</div>}
    </form>

   )
}

export default TaskForm