import React, { useContext } from 'react'
import Logo from '../images/rotten-tomatoes-logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const NavBar = () => {
    const { currentUser, logout } = useContext(AuthContext)
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
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
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
