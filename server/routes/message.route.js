import express from 'express'
import { protect } from '../middleware/auth.js'
import { imageMessageController, textMessageController } from '../controllers/message.controller.js'


const router = express.Router()



router.post('/text',protect,textMessageController)
router.post('/image',protect,imageMessageController)



export default router