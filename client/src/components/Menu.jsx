import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Menu = ({ category }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/posts/?cat=${category}`,
                )
                setPosts(res.data)
            } catch (err) {}
        }

        fetchData()
    }, [category])
    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={post.img} alt="" />
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            ))}
        </div>
    )
}

export default Menu
