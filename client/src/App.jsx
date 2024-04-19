import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Single from './pages/Single'
import Write from './pages/Write'
import './style.scss'

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/post/:id',
                element: <Single />,
            },
            {
                path: '/write',
                element: <Write />,
            },
        ],
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
])

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App
