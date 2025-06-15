import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {  
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    }, 
    category: {
        type: Number,
        require: true,
    }, 
    createdBy: {
        type: String,
        required: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Courses = mongoose.model("Courses", courseSchema);

export default Courses;
