import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Chat from "../models/chat.model.js";

const generateToken = (id) => {
    return jwt.sign({id} ,process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;

    try {
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(200).json({
                success:false,
                messsage:"User already exists"
            })
        }

        const user = await User.create({
            name,email,password
        })
        const token = generateToken(user._id)
        res.status(200).json({
            success:true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,messsage:"Internal Server error"})
    }
}



export const loginUser = async (req,res)=> {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const token = generateToken(user._id)
                return res.json({success:true,token})
            }
        }
        return res.json({success:false,messsage:"Invalid eamil or password"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getUser = async (req,res) => {
    try {
        const user = req.user
        return res.json({success:true,user})
    } catch (error) {
        return res.json({success:false,message:"Internal Server Error"})
    }
}


export const getPublishedImages = async (req,res)=>{
    try {
        const publishedImageMessages = await Chat.aggregate([
            {$unwind:"$messages"},
            {
                $match:{
                    "messages.isImage":true,
                    "messages.isPublished":true
                }
            },
            {
                $project:{
                    _id:0,
                    imageUrl:"$messages.content",
                    userName:"$userName"
                }
            }
        ])
        res.json({success:true,images:publishedImageMessages.reverse()})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server Error"})
    }
}