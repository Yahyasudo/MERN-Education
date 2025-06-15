import React, { useState } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [otp, setOtp] = useState("");
  const {btnLoading, verifyOtp}= UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  }

  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Verify</h2>
            <form onSubmit={submitHandler}>
                    <input type="number" id="name" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter your otp" /> 
                <button disabled={btnLoading} type="submit">
                    {btnLoading ? "Please wait..." : "Verify"}
                  </button>
                <p> Go to <Link to="/login">Login page</Link></p>
            </form>
        </div>
         </div>

  );
}

export default Verify;
