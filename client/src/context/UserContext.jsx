import React, { useEffect } from 'react';
import { createContext, useContext} from 'react';
import axios from 'axios';
import { server } from '../main.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/loading/loading.jsx';


const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = React.useState([]);
    const [isAuth, setIsAuth] = React.useState(false);
    const [btnLoading, setBtnLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    async function loginUser( email, password, navigate, fetchMyCourse) {
        setBtnLoading(true);
        try {
            const {data} = await axios.post(`${server}/api/user/login`,{email, password});
            toast.success(data.message);
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate('/');
            fetchMyCourse();
        } catch (error) {
            setIsAuth(false);
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }


    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const {data} = await axios.post(`${server}/api/user/register`,{
                name,
                email, 
                password});
            toast.success(data.message);
            localStorage.setItem('activationToken', data.activationToken);
            setBtnLoading(false);
            navigate('/verify');
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function verifyOtp(otp,navigate) {
        setBtnLoading(true);
        const activationToken = localStorage.getItem('activationToken');
        try {
            const {data} = await axios.post(`${server}/api/user/verify`,{
                otp,
                activationToken,
            });
            toast.success(data.message);
            navigate('/login');
            setBtnLoading(false);
            localStorage.clear();
            
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function fetchUser(){
        try {
            const {data} = await axios.get(`${server}/api/user/me`,{
                headers:{
                    token: localStorage.getItem('token')
                }
            });  
            setUser(data.user);
            setIsAuth(true);
            setLoading(false);       
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return <UserContext.Provider
    value={{
        user, 
        setUser, 
        isAuth, 
        setIsAuth, 
        btnLoading, 
        loginUser, 
        Loading,
        registerUser,
        verifyOtp,
        fetchUser,
        }}>
            {children}
            <Toaster />
        </UserContext.Provider>;
} 

export const UserData = () =>useContext(UserContext);
