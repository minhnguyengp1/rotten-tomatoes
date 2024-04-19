import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../images/rotten-tomatoes-logo.png'
import './login.scss'
import { AuthContext } from '../../context/authContext.jsx'

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })
    const [err, setErr] = useState(null)
    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate('/')
        } catch (err) {
            setErr(err.response.data)
        }
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={Logo} alt="" />
                    {/* <button className="loginButton">Sign In</button> */}
                </div>
            </div>
            <div className="container">
                <h1>Log In</h1>
                <form>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button className="loginButton" onClick={handleSubmit}>
                        Sign In
                    </button>
                    {err && <p>{err}</p>}
                    <span>
                        Forgot your password? <b>Reset it here</b>
                    </span>
                    <span>
                        New to Rotten Tomatoes?
                        <br />
                        <Link to="/register">Sign up now</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
