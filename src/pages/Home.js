import { useContext, useEffect,useState } from "react"
import TaskDet from '../components/TaskDet'
import TaskForm from '../components/TaskForm'
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"







const Home =()=>{
    const {user} = useContext(AuthContext);
    const {tasks,dispatch} =useContext(TasksContext)
    const [plusbutton, setPlusbutton] = useState(true);
    const [classBtn, setClassBtn] = useState('btn btn-light');
    const [signBtn, setSignBtn] = useState('add_circle');
    
    


    useEffect(()=>{
        
        const fetchTask = async ()=>{
            const res = await fetch('https://to-do-list-backend-theta.vercel.app/api/tasks/',{
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

    const sortedTasks = 
        tasks ? [...tasks]
          .filter(task => task.status === 'Active') 
          .sort((a, b) => {
            if (a.finish_date === b.finish_date) {
            
              const urgencyOrder = {
                Low: 2,
                Medium: 1,
                High: 0
              };
              return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
            } else {
              
              return a.finish_date.localeCompare(b.finish_date);
            }
          }) : [];
      


      

    const setBtn = ()=>{
        if(plusbutton){
            setPlusbutton(false)
            setSignBtn('cancel')
            setClassBtn('btn btn-warning')
        }
        if(!plusbutton){
            setPlusbutton(true)
            setSignBtn('add_circle')
            setClassBtn('btn btn-light')
        }
    }
    return (
        <div >
            <div >
                


                {
                tasks 
                && 
                sortedTasks.map((task)=>(
                    <TaskDet key={task._id} task={task} showEditOption={true} />
                ))}
                
            </div>
            <button
                type="button"
                className={classBtn}
                style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: '9999',
               

                }}
                onClick={() => setBtn()}
            >
                <span className="material-symbols-outlined" style={{fontSize: '60px' }}>{signBtn}</span>
            </button>
            {!plusbutton &&
            <div className="hometaskform" >
            <TaskForm />
            </div>
            }
        </div>
    )
}

export default Home