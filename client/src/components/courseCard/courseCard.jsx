import React from 'react';
import './courseCard.css';
import {server} from '../../main.jsx';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext.jsx';
import toast from 'react-hot-toast';
import { CourseData } from '../../context/CourseContext.jsx';
import axios from 'axios';

const CourseCard = ({course}) => {
  const navigate = useNavigate();
  const {isAuth, user} = UserData();
  const {fetchCourses} = CourseData();

  const deleteHandler = async (Id) => {
    try {
      if(confirm("Are you sure you want to delete this course?")) {
        const {data} = await axios.delete(`${server}/api/course/${Id}`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });

      toast.success(data.message);
      fetchCourses();
      }
     
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="course-card">
        <img src={`${server}/${course.image}`} alt="" className="course-image" />
        <h3>{course.title}</h3>
        <p>Instructor: {course.createdBy}</p>
        <p>Duration: {course.duration} Weeks</p>
        <p>Price: FREE</p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
            <>
            {user.subscription.includes(course._id) ? (
            <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="btn"
            >
            Study
            </button>
            ) : (
            <button
            onClick={() => navigate(`/course/${course._id}`)}
            className="btn"
            >
            Get Started
            </button>
            )}
            </>
            ) : (
            <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="btn"
            >
            Study
            </button>
            )}
        </>
            ) : (
            <button onClick={() => navigate("/login")} className="btn">
            Get Started
            </button>
            )}
          <br />
           {
            user && user.role === "admin" && (<button onClick={() => deleteHandler(course._id)} className='btn' style={{backgroundColor: 'red'}}>Delete</button>)
          }
    </div>
  )}

export default CourseCard;




