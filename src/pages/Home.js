import { useContext, useEffect } from "react"

import TaskDet from '../components/TaskDet'
import TaskForm from '../components/TaskForm'
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"

const Home =()=>{
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
        
    },[dispatch],user)

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