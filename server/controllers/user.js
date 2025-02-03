import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import sendMail from "../middleweare/sendMail.js";


export const register = async(req,res) =>{
         try {
            const {email,name,password} = req.body;
            let user = await User.findOne({email});
            if(user){
               return res.status(400).json({
                  message : "user already exist",
               });
            }
            const hashpassword = await bcrypt.hash(password,10);

            user = {
               email,
               name,
               password : hashpassword
            }

            const otp = Math.floor(Math.random()*1000000);
            const activationToken = jwt.sign({
               user,
               otp
            },process.env.Activation_secret,{
               expiresIn: "5m",
            });

            const data = {
               user,
               otp,
            }

            await sendMail(email,"e-learning",data);
            
            res.status(200).json({
               message : "otp send to your email",
               activationToken
            });


         } catch (error) {
            res.status(500).json({
                message : error.message,
            })
         }
}