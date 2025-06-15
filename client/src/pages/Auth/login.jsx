import React from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import { CourseData } from '../../context/CourseContext';
const Login = () => {
  const navigate = useNavigate();
  const {btnLoading, loginUser} = UserData();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {fetchMyCourse} = CourseData();

  const submitHandler= async(e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  }

  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>login</h2>
            <form onSubmit={submitHandler}>
                
                    <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" />
                    <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" />
                
                <button disabled={btnLoading} type="submit">
                    {btnLoading ? 'please wait...' : 'Login'}
                </button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    </div>
  );
}

export default Login;
