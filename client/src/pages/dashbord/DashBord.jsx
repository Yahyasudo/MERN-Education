import React from 'react';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/courseCard/courseCard';
import './dashbord.css';

const DashBord = () => {
    const { mycourse} = CourseData();
    console.log(mycourse);
  return (
    <div className='student-dashbord'>
        <h2>My Courses</h2>
        <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? mycourse.map((e)=>(
            <CourseCard key={e._id} course={e} />)
        ) : <p> No course yet</p>
        }
        </div>
    </div>
  );
}

export default DashBord;
