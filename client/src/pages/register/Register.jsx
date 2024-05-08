import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Input } from 'antd'
import './register.scss'
import Logo from '../../images/rotten-tomatoes-logo.png'
import { registerThunk } from '../../redux/actions/userActions.js'

const Register = () => {
    // const [inputs, setInputs] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    // })
    // const [err, setErr] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector((state) => state.userRegister)
    console.log('userRegister: ' + JSON.stringify(userRegister))

    const { error, userInfo } = userRegister

    // const handleChange = (e) => {
    //     setInputs((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }))
    // }

    const onFinish = (values) => {
        const email = values.email
        const password = values.password
        dispatch(registerThunk({ email, password }))

        console.log('values: ' + JSON.stringify(values))
        console.log('email: ' + email)
        console.log('password: ' + password)
    }

    useEffect(() => {
        console.log('userInfo when Register is redered: ' + userInfo)
        if (userInfo) {
            navigate('/login')
        }
    }, [userInfo])

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={Logo} alt="" />
                    <button
                        className="loginButton"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </button>
                </div>
            </div>
            <div className="container">
                <h1>Register</h1>
                <Form
                    name="normal_register"
                    className="register-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    {/* <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item> */}
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input a valid email!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-form-button"
                            size="large"
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <span>
                        Do you have an account?
                        <br />
                        <Link to="/login">Login</Link>
                    </span>
                </Form>
            </div>
        </div>
    )
}

export default Register
