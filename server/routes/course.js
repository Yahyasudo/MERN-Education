import express from "express";
import { getAllCourses, getSingleCourse, fetchLessons, fetchLesson, getMyCourses, payementVerifiction } from "../controllers/course.js";
import { isAuth } from "../middleweare/isAuth.js";



const router = express.Router();
router.get("/course/All", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lessons/:id", isAuth, fetchLessons);
router.get("/lesson/:id", isAuth, fetchLesson);
router.get("/MyCourse", isAuth, getMyCourses);
router.post("/course/verification/:id", isAuth, payementVerifiction);


export default router
