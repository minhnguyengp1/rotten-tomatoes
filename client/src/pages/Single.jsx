import { useContext, useEffect, useState } from 'react'
import EditImgage from '../images/edit.png'
import DeleteImage from '../images/delete.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'

const Single = () => {
    const [post, setPost] = useState({})

    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split('/')[2]

    // const { currentUser } = useContext(AuthContext)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    console.log('userInfo in Single: ' + JSON.stringify(userInfo))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8800/api/posts/${postId}`,
                )
                console.log(
                    'response.data in Single.jsx: ' +
                        JSON.stringify(response.data),
                )
                setPost(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [postId, userInfo])

    const handleDelete = async (e) => {
        try {
            const response = await axios.delete(
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
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    {post.profileImg && <img src={post.profileImg} alt="" />}
                    <div className="info">
                        <span>{post.name}</span>
                        <p>
                            Posted {post.date} and {moment(post.date).fromNow()}
                        </p>
                    </div>
                    {userInfo && userInfo.userId === post.uid && (
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
