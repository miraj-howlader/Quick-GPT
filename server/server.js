import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectToDB from './config/db.js'

import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import messageRoutes from './routes/message.route.js'
import creditRoutes from './routes/credit.route.js'
import { stripeWebhooks } from './controllers/webhooks.js'



const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())


app.post('/api/stripe', express.raw({type:'application/json'}),stripeWebhooks)


app.get('/',(req,res)=>{
    res.send("Server is running")
})


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/credit', creditRoutes)


app.listen(PORT,()=>{
    connectToDB()
    console.log(`Server is running on port: ${PORT}`)
})