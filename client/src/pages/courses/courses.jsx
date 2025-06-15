import React from 'react';
import './Courses.css';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/courseCard/courseCard';

const Courses = () => {
    const { courses } = CourseData();
  return (
    <div className="courses">
        <h1>Avialable courses</h1>
        <div className="course-container">
          {courses && courses.length > 0 ? (courses.map((e)=><CourseCard key={e._id} course={e} />) 
          ):(<p>No courses yet</p>)}
        </div>

    </div>
  );
}

export default Courses;
