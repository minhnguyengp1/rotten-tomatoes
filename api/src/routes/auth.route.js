import express from 'express'
import { login, logout, register } from '../controllers/auth.controller.js'

const router = express.Router()

// router.get("/", (req, res) => {
//     res.json("this is post")
// })

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router
