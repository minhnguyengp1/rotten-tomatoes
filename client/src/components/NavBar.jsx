import { useEffect, useState } from 'react'
import Logo from '../images/rotten-tomatoes-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsThunk } from '../redux/actions/userActions.js'
import { logoutThunk } from '../redux/actions/userActions.js'

const NavBar = () => {
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { error, user } = userDetails

    console.log('userInfo after rendering: ' + JSON.stringify(userInfo))
    console.log('user after rendering: ' + JSON.stringify(user))

    const handleLogout = () => {
        dispatch(logoutThunk())
        setName('')
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login', { state: { from: location }, replace: true })
        } else {
            console.log('co userInfo roi ne! ' + JSON.stringify(userInfo))
            if (!user) {
                console.log('chua co user: ', JSON.stringify(user))
                dispatch(getUserDetailsThunk(userInfo.userId))
            } else {
                console.log('co user roi, va do la: ' + JSON.stringify(user))
                setName(user.name)
            }
        }
    }, [dispatch, userInfo, user])

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link tp="/">
                        <img src={Logo} alt="" />
                    </Link>
                    <Link className="link" to="/?cat=movie">
                        <h6>MOVIES</h6>
                    </Link>
                    <Link className="link" to="/?cat=tvshow">
                        <h6>TV SHOWS</h6>
                    </Link>
                </div>
                <div className="links">
                    <span>{name}</span>
                    {userInfo ? (
                        <span onClick={handleLogout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}

                    <span className="write">
                        <Link to="/write" className="link">
                            Write
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NavBar
