import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { server } from "../main";



const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [mycourse, setMyCourse] = useState([]);
    
    async function fetchCourses() {
        try {
            const {data} = await axios.get(`${server}/api/course/All`);
            setCourses(data.courses);
           
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    async function fetchCourse(id) {
        try {
            const {data} = await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
            
        } catch (error) {
            console.error("Error fetching course:", error);
            
        }
    }

    async function fetchMyCourse() {
        try {
            const {data} = await axios.get(`${server}/api/MyCourse`,{
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setMyCourse(data.courses);
        } catch (error) {
            console.error("Error fetching my courses:", error);
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchMyCourse();
    }, []);

    return (
        <CourseContext.Provider value={{ courses, fetchCourses, fetchCourse, course, mycourse, fetchMyCourse }}>
        {children}
        </CourseContext.Provider>
    );
    }

export const CourseData = () => useContext(CourseContext);
