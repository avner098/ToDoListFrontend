import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { AuthContext } from '../context/authContext';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

import { TasksContext } from '../context/TaskContext';

const Calender = () => {
  const [value, onChange] = useState(new Date());

  const [tasksOnDay, setTasksOnDay] = useState(null);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { tasks, dispatch } = useContext(TasksContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks/', {
        headers: {
          'Autthorization' : `Bearer ${user.token}`,
        },
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: 'SET_TASKS', payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  const handleDayClick = (value, event) => {
    const selectedDate = new Date(value);
    const tasksOnDate = tasks.filter(
      (task) =>
        task.finish_date &&
        new Date(task.finish_date).toDateString() === selectedDate.toDateString()
    );
  
    if (tasksOnDate.length > 0) {
      const sortedTasks = tasksOnDate.sort((a, b) => {
        const urgencyOrder = {
          Low: 3,
          Medium: 2,
          High: 1
        };
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      });
  
      setTasksOnDay(sortedTasks);
      setOpen(true);
    } else {
      setTasksOnDay(null);
      setOpen(false);
    }
  };

  const handleUrgencyCard = (urgencyLabel,active) => {
    if(active ==='Disactive'){
      return 'card border-primary mb-3'
    }
    switch (urgencyLabel) {
      case 'Low':
        return 'card text-white bg-success mb-3';

      case 'Medium':
        return 'card text-white bg-info mb-3';

      case 'High':
        return 'card text-white bg-warning mb-3';

      default:
        return 'card text-white bg-warning mb-3';
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const tasksOnDate = tasks.filter(
        (task) =>
          task.finish_date && new Date(task.finish_date).toDateString() === date.toDateString()
      );

      if (tasksOnDate.length > 0) {
        return (
          <div className='pop-out-card with-transform card text-white custom-bg-color mb-3' style={{ marginTop: '5px', padding: '5px' }}>
            <div className="custom-tile-content">
              {tasksOnDate.map((task, index) => (
                <div key={index} onClick={() => setOpen(true)}>
                  <p className="task-title">{task.title}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  const closeModal = () => setOpen(false);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        className="react-calendar"
        locale="en-US"
        calendarType="Hebrew"
        onClickDay={handleDayClick}
        tileContent={tileContent}
      />
      {tasksOnDay && (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="card bg-light mb-3" style={{color:"black", width: '100%' }}>
            <div className="card-header">
              <label style={{fontSize: '22px'}}><strong>Tasks that need to be completed by today:</strong></label>
              <span
                className="material-symbols-outlined"
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  cursor: 'pointer',
                  fontSize: '35px'
                }}
              >
                cancel
              </span>
            </div>
            <div className="card-body">
              {tasksOnDay.map((task, index) => (
                <div className={handleUrgencyCard(task.urgency,task.status)} style={{ width: '100%' }} key={index}>
                  <div className="card-header">{task.status}</div>
                  <div className="card-body">
                    <h4 className="card-title">{task.title}</h4>
                    <p className="card-text">{task.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};




export default Calender;
