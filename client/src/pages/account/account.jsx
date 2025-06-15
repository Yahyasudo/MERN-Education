import React from 'react';
import { MdDashboard, MdLogout} from "react-icons/md";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './account.css';


const Account = ({user}) => {
  const {setIsAuth, setUser} = UserData();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logout successfully");
    navigate('/login');
  }
  return (
    <div>
    {user && (<div className="profile">
      <h2>My Profile</h2>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="btn"><MdDashboard />Dashboard</button>
        <br />
        {
            user.role === 'admin' && (
          <button onClick={()=>navigate('/admin/dashboard')} className="btn">Admin Dashboard</button>
        )}
        <br />
        <button className="btn-logout" onClick={logoutHandler}><MdLogout />Logout</button>
      </div>

    </div>)}
      
    </div>
 ); 
}

export default Account;
