
import Courses from "../models/course.js";
import Lesson from "../models/Lesson.js";
import User from "../models/user.js";
import fs from 'fs';

export const createCourse = async (req, res) => {
   try {
 
      if (!req.file) {
         return res.status(400).json({ message: "File upload failed" });
      }

      const { title, description, category, duration, createdBy } = req.body;
     

      await Courses.create({
         title,
         description,
         category,
         duration,
         createdBy,
         image: req.file.path, 
      });

      res.status(201).json({
         message: "Course created successfully",
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};


export const addLesson = async (req, res) => {
   try {
      const course = await Courses.findById(req.params.id);
      if (!course) {
         return res.status(404).json({ message: "Course not found" });
      }

      const { titre, description } = req.body;

      if (!req.file) {
         return res.status(400).json({ message: "File is required" });
      }


      const lesson = await Lesson.create({ 
         titre,
         description,
         url: req.file.path,
         course: course._id,
      });

      res.status(201).json({ message: "Lesson created successfully", lesson });

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};



export const deleteLesson = async (req, res) => {
   try {
      const lesson = await Lesson.findById(req.params.id);
      if (!lesson) {
         return res.status(404).json({ message: "Lesson not found" });
      }

      if (lesson.url) {
         fs.rm(lesson.url,(err) => {
            if (err) {
               console.error("Failed to delete video:", err.message);
            } else {
               console.log("Video deleted");
            }
         });
      }

      await lesson.deleteOne();
      res.status(200).json({ message: "Lesson deleted successfully" });

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};



export const deleteCourse = async (req, res) => {
   try {
      const course = await Courses.findById(req.params.id);
      if (!course) {
         return res.status(404).json({ message: "Course not found" });
      }

      const lessons = await Lesson.find({ course: course._id });
      await Promise.all(
         lessons.map(async (lesson) => {
            if (lesson.url) {
               fs.rm(lesson.url, (err) => {
                  if (err) {
                     console.error("Failed to delete video:", err.message);
                  } else {
                     console.log("Video deleted");
                  }
               });
            }
         })
      );
      
      await Lesson.deleteMany({ course: course._id });


      if (course.image) {
         fs.rm(course.image, (err) => {
            if (err) {
               console.error("Failed to delete image:", err.message);
            } else {
               console.log("Image deleted");
            }
         });
      }

      await course.deleteOne();

      await User.updateMany({},{ $pull: { subscription: req.params.id } });
      res.status(200).json({ message: "Course deleted successfully" });

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


export const getAllstats = async (req, res) => {
   try {
      const totalCourses = await Courses.countDocuments();
      const totalLessons = await Lesson.countDocuments();
      const totalUsers = await User.countDocuments();

      const stats = {
         totalCourses,
         totalLessons,
         totalUsers,
      };

      res.status(200).json({ stats });
   }catch (error) {
      res.status(500).json({ message: error.message });
   }
}









