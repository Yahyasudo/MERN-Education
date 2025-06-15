import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Utils/Layout';
import axios from 'axios';
import { server } from '../../main';
import './dashoard.css';

function AdminDashboard({ user }) {
    const navigate = useNavigate();
    if (user && user.role !== 'admin') return navigate('/');
    
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalLessons: 0,
        totalUsers: 0,
    });

    async function fetchStats() {
        try {
            const { data } = await axios.get(`${server}/api/stats`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setStats({
                ...data.stats,
            });
        } catch (error) {
            console.log(error);
           
        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    if (stats.loading) {
        return (
            <Layout>
                <div className="main-content">
                    <p>Loading statistics...</p>
                </div>
            </Layout>
        );
    }

    return (
        <div>
            <Layout>
                <div className="main-content">
                    <div className="box">
                        <p>Total Courses</p>
                        <p>{stats.totalCourses || 0}</p>
                    </div>
                    <div className="box">
                        <p>Total Lessons</p>
                        <p>{stats.totalLessons || 0}</p>
                    </div>
                    <div className="box">
                        <p>Total Users</p>
                        <p>{stats.totalUsers || 0}</p>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default AdminDashboard;