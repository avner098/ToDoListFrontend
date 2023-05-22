import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksContextProvider } from './context/TaskContext';
import { authContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <authContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </authContextProvider>
  </React.StrictMode>
);

