import mongoose from "mongoose";
export const conn = async() =>{
    try {
        await mongoose.connect(process.env.URL);
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
 
}