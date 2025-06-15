import React,{useEffect,useState} from 'react';
import './Lesson.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/loading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Lesson = ({user}) => {
    const [lessons, setLessons] = useState([]);
    const [lesson, setLesson] = useState({});
    const [loading, setLoading] = useState(true);
    const [lessLoading, setLessLoading] = useState(false);
    const [show, setShow] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);


    if(user && user.role !== "admin" && !user.subscription.includes(params.id)){ 
        return navigate("/");
    }



    async function fetchLessons() {
        try {
            const {data} = await axios.get(`${server}/api/lessons/${params.id}`, {
                headers:{
                    token: localStorage.getItem("token"),
                },
            });
            setLessons(data.Leçon);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    async function fetchLesson(id){
        setLessLoading(true);
        try {
            const {data} = await axios.get(`${server}/api/lesson/${id}`, {
                headers:{
                    token: localStorage.getItem("token"),
                },
            });
            setLesson(data.Lesson);
            setLessLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    const changeVideoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setVideoPrev(reader.result);
            setVideo(file);
        };
    }



    const submitHandler = async (e) => {
        setBtnLoading(true);
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("titre", title);
        myForm.append("description", description);
        myForm.append("file", video);
        try {
            const {data} = await axios.post(`${server}/api/courses/${params.id}`, myForm, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            setBtnLoading(false);
            setShow(false);
            fetchLessons();
            setTitle("");
            setDescription("");
            setVideo("");
            setVideoPrev("");
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }


    const deleteHandler = async (id) => {
        if(confirm("Are you sure you want to delete this lesson?")) {
            try {
                const {data} = await axios.delete(`${server}/api/lesson/${id}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });
                toast.success(data.message);
                fetchLessons();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        fetchLessons();
    }, []);

  return <>
     {
     loading ? <Loading /> :
     <>
        <div className="lesson-page">
            <div className="left">
                {
                    lessLoading ? <Loading /> :
                    <> 
                     {lesson && lesson.url ? 
                     <>
                     <video src={`${server}/${lesson.url}`}
                        width={"100%"} 
                        controls 
                        controlsList='nodownload noremoteplayback'
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                     ></video>
                        <h1>{lesson.titre}</h1>
                        <p>{lesson.description}</p>

                     </> : <h1>please select a lesson</h1>}
                    </>
                }
            </div>
            <div className="right">
                {
                    user && user.role === "admin" && (<button onClick={() => setShow(!show)} className='common-btn'>{show ? "Cancel" : "Add Lesson +"}</button>)
                }

                {
                    show && (<div className="lesson-form">
                        <h2>Add Lesson</h2>
                        <form onSubmit={submitHandler}>
                            <input type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder='Title' />
                            <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description'></textarea>
                            <input type="file" 
                            placeholder='Upload Video'  
                            onChange={changeVideoHandler} />

                            {
                                videoPrev && (<video src={videoPrev} width={300} controls></video>)
                            }
                            <button disabled={btnLoading} className='common-btn'>
                                {btnLoading ? "Adding..." : "Add lesson"}
                            </button>
                        </form>
                    </div>
                )}

                {
                    lessons && lessons.length > 0 ? lessons.map((e,i) => (
                        <>
                        <div key={e._id} className={`lesson-number ${lesson?._id === e._id ? "active" : ""}`} onClick={() => fetchLesson(e._id)} > 
                           {i + 1}. {e.titre}
                        </div>
                        {
                            user && user.role === "admin" && (
                                    <button 
                                    className='common-btn'
                                    style = {{background: "red"}}
                                    onClick={()=>deleteHandler(e._id)}
                                    >
                                        Delete {e.titre}
                                    </button> 
                            )
                        }
                        </>
                    )): (<p>no lessons found</p>) 
                }

            </div>
        </div>

     </>
     }
    </>

};


export default Lesson;
