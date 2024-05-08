import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer.js'
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
} from './reducers/userReducer.js'

// Load user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')

let initialState = {}

if (userInfoFromStorage) {
    try {
        initialState = {
            userLogin: {
                userInfo: JSON.parse(userInfoFromStorage),
            },
        }
    } catch (error) {
        console.error('Error parsing user info from local storage:', error)
    }
}

const store = configureStore({
    reducer: {
        auth: authReducer, // Register your reducer(s) with the store
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
        userDetails: userDetailsReducer,
    },
    preloadedState: initialState, // Set initial state with user info from local storage
})

// Subscribe to store changes and save user info to local storage
store.subscribe(() => {
    const userInfo = store.getState().userLogin.userInfo
    if (userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    } else {
        localStorage.removeItem('userInfo') // Remove userInfo if it becomes null
    }
})

export default store
