import express from 'express'
import { getPlans, purchasePlan } from '../controllers/credit.controller.js'
import { protect } from '../middleware/auth.js'


const router = express.Router()



router.get('/plan',getPlans)
router.post('/purchase',protect,purchasePlan)


export default router