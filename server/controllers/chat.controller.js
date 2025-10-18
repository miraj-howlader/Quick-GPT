import Chat from "../models/chat.model.js"

export const createChat = async (req,res) => {
    try {
        const userId = req.user._id
        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.name
        }
        await Chat.create(chatData)
        res.json({
            success:true,
            message:"Chat created"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export const getChat = async (req,res)=> {
    try {
        const userId = req.user._id
        const chats = await Chat.find({userId}).sort({updatedAt:-1})
        res.json({
            success:true,chats
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server error"})
    }
}

export const deleteChat = async (req,res) => {
    try {
        const userId=req.user._id;
        const {chatId} =req.body

        await Chat.deleteOne({_id:chatId,userId})
        res.json({success:true,message:"Chat deleted"})
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Internal Server Error"
        })
    }
}