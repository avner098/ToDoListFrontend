import { useContext, useEffect,useState } from "react"
import TaskDet from '../components/TaskDet'
import TaskForm from '../components/TaskForm'
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"

const Home =()=>{
    const {user} = useContext(AuthContext);
    const {tasks,dispatch} =useContext(TasksContext)
    const [plusbutton, setPlusbutton] = useState(true);
    const [classBtn, setClassBtn] = useState('btn btn-primary');
    const [signBtn, setSignBtn] = useState('add_circle');

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

    const sortedTasks = tasks ? [...tasks].sort((a, b) => a.finish_date.localeCompare(b.finish_date)) : [];

    const setBtn = ()=>{
        if(plusbutton){
            setPlusbutton(false)
            setSignBtn('close')
            setClassBtn('btn btn-outline-warning')
        }
        if(!plusbutton){
            setPlusbutton(true)
            setSignBtn('add_circle')
            setClassBtn('btn btn-primary')
        }
    }
    return (
        <div className="home">
            <div className="tasks">
                {tasks && sortedTasks.map((task)=>(
                    <TaskDet key={task._id} task={task} />
                ))}
            </div>
            <button
                type="button"
                className={classBtn}
                style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                }}
                onClick={() => setBtn()}
            >
                <span className="material-symbols-outlined" style={{}}>{signBtn}</span>
            </button>
            {!plusbutton &&<div
            style={{
                position: "fixed",
                top: "50%",
                right: "10%",
                transform: "translate(-50%, -50%)",
            }}
            >
            <TaskForm />
            </div>
            }
        </div>
    )
}

export default Home