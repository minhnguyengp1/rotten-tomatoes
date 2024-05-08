import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/post.route.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import fileRouter from './routes/file.route.js'
import { verifyToken } from './middleware/authMiddelware.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
// app.use('/api/users', verifyToken, userRoutes)
// app.use('/api/posts', verifyToken, postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/files', fileRouter)

export default app
