
import Courses from "../models/course.js";
import lesson from "../models/Lesson.js";
import User from "../models/user.js";


export const getAllCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        if (!courses) {
            return res.status(404).json({ message: "No courses found" });
        }
        res.json({courses});
    } catch (error) {
        res.status(500).json({
            message : error.message,
        })
    }
}


export const getSingleCourse = async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({course});
    } catch (error) {
        res.status(500).json({
            message : error.message,
        })
    }
}

export const fetchLessons = async (req, res) => {
    try {
        
        const Leçon = await lesson.find({ course: req.params.id });
        if (!Leçon) {
            return res.status(404).json({ message: "Leçon not found" });
        }

        const user = await User.findById(req.user._id);
        if(user.role === "admin"){
              return res.status(200).json({ Leçon });
        }

        if(!user.subscription.includes(req.params.id)){
            return res.status(403).json({message: "You are not authorized to access this course"})
        }
        res.json({Leçon});
    } catch (error) {
        res.status(500).json({
            message : error.message,
        })
    }
}


export const fetchLesson = async (req, res) => {
    try {
        
        const Lesson = await lesson.findById(req.params.id);
        if (!Lesson) {
            return res.status(404).json({ message: "Leçon not found" });
        }

        const user = await User.findById(req.user._id);
        if (user.role === "admin") {
            return res.status(200).json({ Lesson });
        }

        if(!user.subscription.includes(Lesson.course)){
            return res.status(403).json({message: "You are not authorized to access this course"})
        }
        res.json({Lesson});
    } catch (error) {
        res.status(500).json({
            message : error.message,
        })
    }
}



export const getMyCourses = async (req, res) => {
   try{
      const courses = await Courses.find({_id: req.user.subscription});
      res.status(200).json({courses});

   }catch (error) {
      res.status(500).json({ message: error.message });
   }
}


export const payementVerifiction = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        const course = await Courses.findById(req.params.id);

        user.subscription.push(course._id);
        await user.save();
        res.status(200).json({
            message: "join de course successful",
            course,
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}