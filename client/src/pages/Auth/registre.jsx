import React,{useState} from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

const Registre = () => {
  
  const navigate = useNavigate();
  const {btnLoading, registerUser} = UserData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const submitHandler= async(e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  }


  return (
   <div className="auth-page">
        <div className="auth-form">
            <h2>register</h2>
            <form onSubmit={submitHandler}>
                    <input type="text" id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" /> 
                    <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" />
                    <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" />
                <button disabled={btnLoading} type="submit">
                  {btnLoading ? 'please wait...' : 'Register'}
                </button>
                <p> have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    </div>
  );
}

export default Registre;
