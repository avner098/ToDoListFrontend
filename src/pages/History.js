import { useContext, useEffect } from "react"
import TaskDet from '../components/TaskDet'
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"

const History =()=>{
    const {user} = useContext(AuthContext);
    const {tasks,dispatch} =useContext(TasksContext)

    useEffect(()=>{
        //get tasks from db 
        const fetchTask = async ()=>{
            const res = await fetch('/api/tasks/',{
                headers: {
                    'Autthorization' : `Bearer ${user.token}`
                }
            })
            const json= await res.json()

            if(res.ok){
                dispatch({type:'SET_TASKS',payload: json})
            }
        }

        if(user){
            fetchTask()
        }
        
    },[dispatch,user])

    
    const filteredTasks = tasks ? tasks.filter(task => task.status === 'Disactive') : [];

    
    return (
        <div className="home">
            <div className="tasks">
                {tasks && filteredTasks.map((task)=>(
                    <TaskDet key={task._id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default History