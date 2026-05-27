import express from 'express';
import cors from 'cors';
import connection from './config/db.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();


const app=express();
app.use(cors());
app.use(express.json());
connection();

app.post('/api/signup', async (req,res)=>{

    try{
        const {name,email,password,confirm}=req.body;

        if(password!==confirm){
            return res.status(400).json({
                message:"Password and confirm password do not match"
            })
        }

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"User already exists with this email"
            })
        }

        const hashed=await bcrypt.hash(password,10);

        const user=new User({
            name,
            email,
            password:hashed
        })

        
    }
    catch(err){

    }

    res.status(200).json({
        message:"Signup successful"
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})