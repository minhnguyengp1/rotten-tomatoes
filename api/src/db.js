import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const DB_PASSWORD = process.env.DB_PASSWORD

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'blog',
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err)
        return
    }
    console.log('Connected to MySQL database')
})

export default db
