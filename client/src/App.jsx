import React from 'react';
import './App.css';
import{BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/Auth/login';
import Registre from './pages/Auth/registre';
import Verify from './pages/Auth/verify';
import Footer from './components/footer/footer';
import About from './pages/about/about';
import Account from './pages/account/account';
import { UserData } from './context/UserContext';
import Loading from './components/loading/loading';
import Courses from './pages/courses/courses';
import CourseDescription from './pages/courseDescription/courseDescription';
import DashBord from './pages/dashbord/DashBord';
import CourseStudy from './pages/coursestudy/CourseStudy';
import Lesson from './pages/lesson/Lesson';
import AdminDashboard from './admin/Dashboard/AdminDashboard';
import AdminCourses from './admin/courses/adminCourses';


const App = () => {
  const {isAuth, user, loading} = UserData();
  return (
   <>
   {loading?(
    <Loading />
  ):(<BrowserRouter>
   <Header isAuth={isAuth}/>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/account" element={isAuth?<Account user={user} />:<Login />} />
    <Route path="/login" element={isAuth?<Home />:<Login />} />
    <Route path="/register" element={isAuth?<Home />:<Registre />} />
    <Route path="/verify" element={isAuth?<Home />:<Verify />} />
    <Route path="/course/:id" element={isAuth?<CourseDescription user={user} />:<Login />} />
    <Route path="/:id/dashboard" element={isAuth?<DashBord user={user} />:<Login />} />
    <Route path="/course/study/:id" element={isAuth?<CourseStudy user={user} />:<Login />} />
    <Route path="/lessons/:id" element={isAuth?<Lesson user={user} />:<Login />} />
    <Route path="/admin/dashboard" element={isAuth?<AdminDashboard user={user} />:<Login />} />
    <Route path="/admin/course" element={isAuth?<AdminCourses user={user} />:<Login />} />
   </Routes>
   <Footer />
   </BrowserRouter>)}
   </>
  );
}

export default App;
