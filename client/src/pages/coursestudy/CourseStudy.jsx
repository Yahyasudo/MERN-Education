import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CourseStudy.css';
import { CourseData } from '../../context/CourseContext';
import {  } from 'react-router-dom';
import { server } from '../../main';

const CourseStudy = ({user}) => {
    const pramas = useParams();
    const {fetchCourse, course} = CourseData();
    const navigate = useNavigate();

    if(user && user.role !== "admin" && !user.subscription.includes(pramas.id))
      return navigate("/");

    useEffect(() => {
        fetchCourse(pramas.id);
    },[]);
  return (
    <>
    {
      course && <div className="course-study-page">
        <img src={`${server}/${course.image}`} alt=""  width={350}/>
        <h2>{course.title}</h2>
        <h4>{course.description}</h4>
        <h5>by -{course.createdBy}</h5>
        <h5>duration - {course.duration} weeks</h5>
        <Link to={`/lessons/${course._id}`}>
          <h2>Lectures</h2>
        </Link>
      </div>

    }
    </>
  );
}


export default CourseStudy;
