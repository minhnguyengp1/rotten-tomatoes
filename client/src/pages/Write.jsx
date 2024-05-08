import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

const Write = () => {
    const state = useLocation().state
    const [value, setValue] = useState(state?.title || '')
    const [title, setTitle] = useState(state?.desc || '')
    const [file, setFile] = useState()
    const [cat, setCat] = useState(state?.cat || '')

    const navigate = useNavigate()

    const upload = async () => {
        try {
            const formData = new FormData()
            if (file) {
                console.log('file: ', file)
                formData.append('file', file)
            }
            const { data } = await axios.post(
                'http://localhost:8800/api/files/upload',
                formData,
            )
            console.log('data: ', data)
            return data.filename
        } catch (err) {}
    }

    const handlePublish = async (e) => {
        e.preventDefault()
        const formattedDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
        console.log('formattedDate: ', formattedDate)
        const imgUrl = await upload()
        const userData = JSON.parse(localStorage.getItem('userInfo'))

        console.log('userData: ', userData)
        const token = userData ? userData.access_token : null

        try {
            state
                ? await axios.put(
                      `http://localhost:8800/api/posts/${state.id}`,
                      {
                          title,
                          desc: value,
                          img: file ? imgUrl : '',
                          cat,
                      },
                      {
                          headers: {
                              //   'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                          },
                      },
                  )
                : await axios.post(
                      `http://localhost:8800/api/posts/`,
                      {
                          title,
                          desc: value,
                          cat,
                          img: file ? imgUrl : '',
                          date: formattedDate,
                      },
                      {
                          headers: {
                              //   'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                          },
                      },
                  )
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="add">
            {/* // EDITOR */}
            <div className="content">
                {/* // TITLE */}
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                {/* // EDITOR-CONTAINER */}
                <div className="editorContainer">
                    <ReactQuill
                        className="edit"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>

            <div className="menu">
                {/* // UPLOAD PART */}
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="uploadFile"
                        name=""
                        onChange={(e) => {
                            if (e.target.files) {
                                setFile(e.target.files[0])
                            }
                        }}
                    />
                    <label className="uploadFileLabel" htmlFor="uploadFile">
                        Upload Image
                    </label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>

                {/* // CATEGORY SELECTION PART */}
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === 'movie'}
                            name="cat"
                            value="movie"
                            id="movie"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="movie">Movies</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === 'tvshow'}
                            name="cat"
                            value="tvshow"
                            id="tvshow"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="tvshow">TV shows</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write
