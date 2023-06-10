import { useContext, useState } from "react"
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"

const TaskForm = ()=>{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [status,setStatus] = useState('Active')
    const [finish_date,setFinish_date] = useState('')
    
    const [urgency,setUrgency] = useState('Low')
    const [err,setErr] = useState(null)
    const {dispatch} =useContext(TasksContext)
    const {user} = useContext(AuthContext);

    const submitHandler = async(e)=>{
        e.preventDefault()
    

        if(!user){
            return
        }

        const task={title,content,status,finish_date,urgency}
        
        const res = await fetch('https://to-do-list-backend-theta.vercel.app/api/tasks/',{ 
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
            setStatus('Active')
            setUrgency('Low')
            setFinish_date('')
            dispatch({type:'CREATE_TASK',payload:json})
            console.log('new task added',json)
        }
    }

   return(
    <div className= "taskform">
        

        <form className="create" onSubmit={submitHandler}>

            <h2>Add New Task</h2>


            <div className="form-group">
                <label>Task Title:</label>
                <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        />
            </div>

           
            <div className="form-group">
                <label  className="form-label mt-4">Task content:</label>
                <textarea className="form-control" id="exampleTextarea" rows="3"onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
            </div>

            <div className="form-group">
                <label className="form-label mt-4">Task Urgency:</label>
                <select className="form-control" id="exampleSelect1"  onChange={(e)=> setUrgency(e.target.value)} value={urgency}>
                    <option >Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
            
           


            <label>Task completion date:</label>
            <input type="date" className="form-control" onChange={(e)=> setFinish_date(e.target.value)} value={finish_date} min={new Date().toISOString().split('T')[0]}></input>

            <button className="btn btn-secondary">Add Task</button>
            {err && <div className="alert alert-dismissible alert-warning">{err}</div>}
        </form>
        
    </div>
   )
}

export default TaskForm