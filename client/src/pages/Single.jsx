import { useContext, useEffect, useState } from 'react'
import EditImgage from '../images/edit.png'
import DeleteImage from '../images/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
    const [post, setPost] = useState({})

    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split('/')[2]

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/posts/${postId}`,
                )
                setPost(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [postId])

    const handleDelete = async (e) => {
        try {
            const res = await axios.delete(
                `http://localhost:8800/api/posts/${postId}`,
            )
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="single">
            <div className="content">
                <img src={post?.img} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>
                            Posted {post.date} and {moment(post.date).fromNow()}
                        </p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={EditImgage} alt="" />
                            </Link>
                            <img
                                onClick={handleDelete}
                                src={DeleteImage}
                                alt=""
                            />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                {post.desc}
            </div>
            <Menu cat={post.cat} />
        </div>
    )
}

export default Single
