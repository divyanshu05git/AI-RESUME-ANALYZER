import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const url=process.env.MONGO_URI;

export default async function connection(){
    try{
        const response=await mongoose.connect(url);
        console.log("Connected to db successfully")
    }
    catch(err){
        console.log("Error while connectiong to db")
        console.log(typeof url)
    }
}