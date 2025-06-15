import express from "express";
import { isAuth, isTeacher } from "../middleweare/isAuth.js";
import { createCourse, addLesson, deleteLesson, deleteCourse, getAllstats } from "../controllers/teacher.js";
import { uploadFiles } from "../middleweare/multer.js";

const router = express.Router();

router.post('/courses/new', isAuth, isTeacher, uploadFiles, createCourse);
router.post('/courses/:id', isAuth, isTeacher, uploadFiles, addLesson);
router.delete('/course/:id', isAuth, isTeacher, deleteCourse);
router.delete('/lesson/:id', isAuth, isTeacher, deleteLesson);
router.get('/stats', isAuth, isTeacher, getAllstats);



export default router
