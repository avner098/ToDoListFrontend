import { useContext,useState } from "react"
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"



const TaskDet =({task,showEditOption})=>{
const {dispatch} =useContext(TasksContext)
const {user} = useContext(AuthContext);


const [title,setTitle] = useState(task.title)
const [content,setContent] = useState(task.content)
const [status] = useState(task.status)
const [finish_date,setFinish_date] = useState(task.finish_date)
const [urgency,setUrgency] = useState(task.urgency)
const [editMode,setEditMode] = useState(false)




const handleDelete= async() =>{
    if(!user){
        return
    }
    const res = await fetch("/api/tasks/"+task._id,{
        method: 'DELETE',
        headers: {'Autthorization' : `Bearer ${user.token}`}
    })
    
    const json = await res.json()
    if(res.ok){
        dispatch({type:'DELETE_TASK',payload:json})
    }

}


const handleEdit = async (event) => {
  event.preventDefault();

  if (!user) {
    return;
  }



 
  const updatedTask={title,content,status,finish_date,urgency}

  if (event.target.id === 'done-button') {
    
    updatedTask.status = 'Disactive'
    console.log('done', updatedTask)
  }

  const res = await fetch('/api/tasks/'+ task._id,{ 
    method:'PATCH',
    body: JSON.stringify(updatedTask),
    headers:{
        'Content-Type': 'application/json',
        'Autthorization' : `Bearer ${user.token}`
    }
  })



  const json = await res.json();

  if (res.ok) {
    dispatch({ type: "EDIT_TASK", payload: json });
    setEditMode(false);
  }
}

const urgencyColor = () => {
  if (!showEditOption) {
    return 'card text-white bg-lavender mb-3';
  }
  switch (urgency) {
    case 'Low':
      return 'card text-white bg-success mb-3'
    case 'Medium':
      return 'card text-white bg-info mb-3'
    case 'High':
      return 'card text-white bg-warning mb-3'
    default:
      return 'card text-white bg-secondary mb-3'
  }
}

const getDaysLeft = (finishDate) =>{
  
  const [year, month, day] = finishDate.split("-");

  const finishDateTime = new Date(year, month - 1, day);

  const currentDate = new Date();

  const timeDifference = finishDateTime.getTime() - currentDate.getTime();

  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  if(daysLeft<=0){
    return 'Today';
  }

  return daysLeft;
}



  
  

return (
      

      <div className={urgencyColor()} style={{ maxWidth: "300rem",boxShadow:"0px 5px 10px 0px rgba(0, 0, 0, 0.5)"}} >
        <div className="card-header">
          <strong>Urgency: </strong> {task.urgency}
          <span className="material-symbols-outlined" onClick={handleDelete} style={{ 
                position: "absolute",
                right: "20px",
                cursor: "pointer"
                }}>delete </span>
                {showEditOption&&( <span id="edit" className="material-symbols-outlined" onClick={() => setEditMode(true)} style={{
                  position: "absolute",
                  right: "60px",
                  cursor: "pointer"
                }}>edit</span>
                )}
            
            
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          
          {editMode ? (
            <form className="editform" onSubmit={handleEdit}>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
      
              <label>Task content:</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />

              <label>Task Urgency:</label>
                <select   className="form-control" onChange={(e)=> setUrgency(e.target.value)} value={urgency}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option> 
                </select>
      
             
      
              <label>Task completion date:</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setFinish_date(e.target.value)}
                value={finish_date}
                min={new Date().toISOString().split('T')[0]}
              />
      
              <button type="submit" className="btn btn-light" style={{marginRight: "10px"}}>Save Changes</button>
              <button type="button" className="btn btn-dark" onClick={() => setEditMode(false)}>Discard</button>
            </form>
          ) : (
            <>
              <p className="card-text">
                <strong>Content: </strong> {task.content}
              </p>
            
              <p className="card-text">
                <strong>Status: </strong> {task.status}
              </p>
              <p className="card-text">
                <strong>Days left: </strong>  {
                getDaysLeft(task.finish_date)}
              </p>
              {showEditOption&&
              <span className="done material-symbols-outlined" onClick={handleEdit} id='done-button'>done_outline</span>
              }

            
            </>
    
          )}
        </div>
      </div>
   
  );
}


export default TaskDet