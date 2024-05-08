import express from 'express'
import multer, { memoryStorage } from 'multer'
const fileRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})

const upload = multer({ storage: storage })

fileRouter.post('/upload', upload.single('file'), function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        console.log('req.file received in backend:', req.file)

        const file = req.file

        return res.status(200).json({
            message: 'File uploaded successfully',
            filename: file.filename,
        })
    } catch (error) {
        console.error('Error uploading file:', error)
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
})

export default fileRouter
