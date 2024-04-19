import app from './src/index.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8800

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

process.on('SIGINT', () => {
    console.log('Shutting down server')
    server.close(() => {
        console.log('Server has been shut down')
    })
})
