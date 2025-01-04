import express from "express";
import dotenv from "dotenv";
import {conn} from "./database/db.js";
import userRouter from "./routes/user.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => res.send('Server is running'));

//using routes
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    conn();
});


