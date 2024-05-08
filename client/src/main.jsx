import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { loadAuthState } from './utils/checkAuth.js'
import { Provider } from 'react-redux'
import store from './redux/store.js'

const preloadedState = loadAuthState()

if (preloadedState) {
    store.dispatch({
        type: 'AUTH_RESTORE',
        payload: preloadedState,
    })
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
