import express from 'express'
import { createChat, deleteChat, getChat } from '../controllers/chat.controller.js'
import { protect } from '../middleware/auth.js'


const router = express.Router()



router.get('/create',protect,createChat)
router.get('/get',protect,getChat)
router.post('/delete',protect,deleteChat)

export default router