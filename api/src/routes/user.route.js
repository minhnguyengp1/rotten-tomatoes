import express from 'express'
import { addUser } from '../controllers/user.controller.js'

const router = express.Router()

// router.get("/", (req, res) => {
//     res.json("this is post")
// })

router.get('/', addUser)

export default router
