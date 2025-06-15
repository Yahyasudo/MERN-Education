
import './courseDescription.css';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { useEffect } from 'react';
import { server } from '../../main.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext.jsx';


const CourseDescription = ({user}) => {
    const params = useParams();
    const navigate = useNavigate();
    const{fetchCourse, course}= CourseData();
    const {fetchUser} = UserData();

    useEffect(() => {
        fetchCourse(params.id);
       }, []);

    const checkoutHandler = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/course/verification/${course._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      await fetchUser();
      toast.success(data.message);
      navigate(`/courses`);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

   

   
  return (
    <>
    {course && (
        <div className="course-description">
            <div className="course-header">
                <img 
                src={`${server}/${course.image}`} 
                alt="" 
                className="course-image" />
                <div className="course-info">
                <h1>{course.title}</h1>
                <p>Instructor: {course.createdBy}</p>
                <p>Duration: {course.duration} Weeks</p>
                </div>
            </div> 
            <p>Lets get started with course FREE</p>
                {
                    user && user.subscription.includes(course._id)?(
                        <button onClick={()=>navigate(`/course/study/${course._id}`)} className='btn'>study</button>
                    ):(
                        <button onClick={checkoutHandler} className='btn'>join course</button>
                    )
                }
        </div>
        )}
    </>
  );
}

export default CourseDescription;
