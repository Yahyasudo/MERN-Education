import React, {useState} from 'react';
import Layout from '../Utils/Layout';
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/courseCard/courseCard';
import './adminCourse.css';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';

// If backend expects numbers for categories, modify your array:
const categories = [
    { value: 1, label: "web development" },
    { value: 2, label: "app development" },
    { value: 3, label: "game development" },
    { value: 4, label: "Data Science" },
    { value: 5, label: "Artificial Intelligence" }
];

function AdminCourses({user}) {
    const navigate = useNavigate();
    if (user && user.role !== 'admin') return navigate('/');
    const {courses, fetchCourses} = CourseData();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        duration: "",
        image: null
    });
    const [imagePrev, setImagePrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setFormData(prev => ({ ...prev, image: file }));
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Frontend validation
        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }
        
        setBtnLoading(true);
        const myForm = new FormData();

        // Append all form data
        myForm.append("title", formData.title);
        myForm.append("description", formData.description);
        myForm.append("createdBy", formData.createdBy);
        myForm.append("category", formData.category);
        myForm.append("duration", formData.duration);
        if (formData.image) {
            myForm.append("file", formData.image);
        }

        try {
            const {data} = await axios.post(`${server}/api/courses/new`, myForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            await fetchCourses();
            // Reset form
            setFormData({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                duration: "",
                image: null
            });
            setImagePrev("");
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <Layout>
            <div className="admin-courses">
                <div className="left">
                    <h1>All Courses</h1>
                    <div className="dashboard-content">
                        {courses && courses.length > 0 ? 
                            courses.map((e) => <CourseCard key={e._id} course={e}/>) :
                            <p>No Courses Yet</p>
                        }
                    </div>
                </div>

                <div className="right">
                    <div className="add-course">
                        <div className="course-form">
                            <h2>Add Course</h2>
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="title">Title*</label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        name="title"
                                        value={formData.title} 
                                        onChange={handleChange} 
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input 
                                        type="text" 
                                        id="description" 
                                        name="description"
                                        value={formData.description} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="createdBy">Created By</label>
                                    <input 
                                        type="text" 
                                        id="createdBy" 
                                        name="createdBy"
                                        value={formData.createdBy} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="category">Category*</label>
                                    <select 
                                        id="category" 
                                        name="category"
                                        value={formData.category} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option value={cat.value} key={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="duration">Duration (hours)</label>
                                    <input 
                                        type="number" 
                                        id="duration" 
                                        name="duration"
                                        value={formData.duration} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="image">Course Image*</label>
                                    <input 
                                        type="file" 
                                        id="image" 
                                        onChange={changeImageHandler} 
                                        required 
                                    />
                                </div>
                                
                                {imagePrev && (
                                    <div className="img-preview">
                                        <img src={imagePrev} alt="Course preview" width={300}/>
                                    </div>
                                )}
                                
                                <button type="submit" disabled={btnLoading} className='common-btn'>
                                    {btnLoading ? "Please wait..." : "Add Course"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AdminCourses;