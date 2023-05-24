import { useContext,useState } from "react"
import { TasksContext } from "../context/TaskContext"
import { AuthContext } from "../context/authContext"
import Draggable from "react-draggable";

const TaskDet =({task})=>{
const {dispatch} =useContext(TasksContext)
const {user} = useContext(AuthContext);

const [title,setTitle] = useState(task.title)
const [content,setContent] = useState(task.content)
const [status,setStatus] = useState(task.status)
const [finish_date,setFinish_date] = useState(task.finish_date)
const [editMode,setEditMode] = useState(false)

const handleDelete= async() =>{
    if(!user){
        return
    }
    const res = await fetch("/api/tasks/"+task._id,{
        method: 'DELETE',
        headers: {'Autthorization' : `Bearer ${user.token}`}
    })
    //the obj i delete
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

 
  const updatedTask={title,content,status,finish_date}
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


  const handleDrag = (e, data) => {
    // Handle drag event if needed
    console.log(data);
  };
  
  

return (
  <Draggable
  defaultPosition={{ x: 0, y: 0 }}
  handle=".draggable-handle"
  onDrag={handleDrag}
 
    >
    <div className="taskDet">
      
      <div className="draggable-container">
      <div className="draggable-handle">Drag Me</div>
        <div className="draggable-content">
      <h3>{title}</h3>
      {editMode ? (
        <form className="editform" onSubmit={handleEdit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
  
          <label>Task content:</label>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
  
          <label>Task status:</label>
          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option>Disactive</option>
            <option>Active</option>
          </select>
  
          <label>Task completion date:</label>
          <input
            type="date"
            onChange={(e) => setFinish_date(e.target.value)}
            value={finish_date}
          />
  
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>Discard</button>
        </form>
      ) : (
        <>
          <p>
            <strong>Content: </strong> {task.content}
          </p>
          <p>
            <strong>Status: </strong> {task.status}
          </p>
          <p>
            <strong>Finish date: </strong> {task.finish_date}
          </p>

          <span className="material-symbols-outlined" onClick={handleDelete}>delete </span>
      
          <span id="edit" className="material-symbols-outlined"onClick={() => setEditMode(true)}>edit</span>
        </>
 
      )}

      </div>
      </div>
    

    </div>
    </Draggable>
  );
}


export default TaskDet