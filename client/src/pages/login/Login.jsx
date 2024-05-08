import { useEffect } from 'react'
import { Form, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../images/rotten-tomatoes-logo.png'
import LoginForm from '../../forms/LoginForm.jsx'
import './login.scss'
import { loginThunk } from '../../redux/actions/userActions.js'

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    console.log('userLogin: ' + JSON.stringify(userLogin))

    const { error, userInfo } = userLogin

    console.log('location.search: ' + location.search)

    const redirect = new URLSearchParams(location.search).get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const onFinish = (values) => {
        const email = values.email
        const password = values.password
        dispatch(loginThunk({ email, password }))
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={Logo} alt="" />
                    {/* <button className="loginButton">Sign In</button> */}
                </div>
            </div>
            <div className="containerLogin">
                <h1>Login</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <LoginForm />
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                        >
                            Einloggen
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
