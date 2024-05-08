import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization

    console.log('token: ' + token)

    // Check if token exists
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' })
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Attach decoded user information to request object
        next() // Move to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' })
    }
}
