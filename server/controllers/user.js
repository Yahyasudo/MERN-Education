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
               expiresIn: "1h",
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


export const verifyUser = async(req,res) =>{
   try {
      const {otp,activationToken} = req.body;
      const verify = jwt.verify(activationToken,process.env.Activation_secret);
     

      if(!verify){
         return res.status(400).json({
            message : "invalid token",
         });
      }


      if(verify.otp !== otp){
         return res.status(400).json({
            message : "invalid otp",
         });
      }

      await User.create({
         name : verify.user.name,
         email : verify.user.email,
         password : verify.user.password,
      });

      res.status(200).json({
         message : "user register successfully",
      });


   } catch (error) {
      res.status(500).json({
         message : error.message,
      });
   }
}


export const loginUser =async(req,res)=>{
   try {
      const {email, password} = req.body
      const user = await User.findOne({email})

       if (!user) {
         return res.status(400).json({
            message: "email don't find"
         })
       }

       const mathpassword = await bcrypt.compare(password, user.password);
       if (!mathpassword) {
         return res.status(400).json({
            message: "password not correct"
         })
       }

       const token = await jwt.sign({_id: user._id}, process.env.Jwt_Sec,{
         expiresIn: "15d",
       });

       res.json({
         message: `welcome mr ${user.name}`,
         token,
         user
       })

   } catch (error) {
      res.status(500).json({
         message : error.message,
      });
   }
}

export const myProfil = async(req, res)=>{
   try {
      const user = await User.findById(req.user._id)
      res.json({
         user
      })
   } catch (error) {
      res.status(500).json({
         message : error.message,
      });
   }

}

