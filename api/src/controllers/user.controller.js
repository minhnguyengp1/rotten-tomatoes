import { db } from '../databases/init.mysql.js'
import jwt from 'jsonwebtoken'

// /api/users/:userId
export const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE id = ?'

    db.query(q, [req.params.userId], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }

        // Check if user with the provided id exists
        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = data[0]

        return res.status(200).json({
            userId: user.id,
            name: user.name,
            email: user.email,
            profileImg: user.profileImg,
        })
    })
}
