import mongoose from "mongoose";

const leçonSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        },
    description: {
        type: String,
        required: true,
        },
    url: {
        type: String,
        required: true,
        },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        },
    createAt: {
        type: Date,
        default: Date.now,
        },
    });

const Lesson = mongoose.model("leçons", leçonSchema);

export default Lesson;

    
    

      