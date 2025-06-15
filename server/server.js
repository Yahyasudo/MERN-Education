import express from "express";
import dotenv from "dotenv";
import {conn} from "./database/db.js";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js"
import teacherRouter from "./routes/teacher.js"
import cors from "cors";



dotenv.config();

const app = express();
const PORT = process.env.PORT;

 
app.get('/', (req, res) => res.send('Server is running'));
app.use("/uploads", express.static("uploads"));

//middleware
app.use(express.json());
app.use(cors());


//using routes
app.use('/api', userRouter);
app.use('/api', courseRouter);
app.use('/api', teacherRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    conn();
});
 

