import React from 'react';
import aboutImage from '../images/aboutPic.png';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1 className="about-heading">About Us</h1>
          <p>Welcome to our task manager app! We are dedicated to helping you stay organized and efficient by providing a simple and intuitive platform to manage your tasks.</p>
          <p>Our app allows you to create, update, and delete tasks, set due dates and priorities, and track your progress. Whether you're a student, professional, or anyone in need of task management, our app is here to simplify your life.</p>
          <p>At Task Manager App, we believe in delivering a seamless user experience. Our goal is to provide you with a clutter-free interface that focuses on the essentials, allowing you to focus on what matters most - completing your tasks and achieving your goals.</p>
          <p>If you have any questions, feedback, or suggestions, we'd love to hear from you. Feel free to contact us using the information provided below:</p>
          <ul>
            <li>Email: dor@taskmanager.com</li>
            <li>Phone: 054-233-4450</li>
            <li>Address: 42 Hadekel, Carmiel, Israel</li>
          </ul>
        </div>
        <div className="about-image-container">
          <img src={aboutImage} alt="About Us" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default About;
