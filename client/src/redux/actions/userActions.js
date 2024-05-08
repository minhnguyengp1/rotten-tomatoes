import * as actionTypes from '../constants/userActionTypes.js'
import axios from 'axios'

const loginRequest = () => ({
    type: actionTypes.USER_LOGIN_REQUEST,
})

const loginSuccess = (data) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: data,
})

const loginFail = (errorMessage) => ({
    type: actionTypes.USER_LOGIN_FAIL,
    payload: errorMessage,
})

const registerRequest = () => ({
    type: actionTypes.USER_REGISTER_REQUEST,
})

const registerSuccess = (data) => ({
    type: actionTypes.USER_REGISTER_SUCCESS,
    payload: data,
})

const registerFail = (errorMessage) => ({
    type: actionTypes.USER_REGISTER_FAIL,
    payload: errorMessage,
})

export const loginThunk = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest())

            const response = await axios.post(
                'http://localhost:8800/api/auth/login',
                credentials,
            )

            console.log('response.data: ' + JSON.stringify(response.data))

            dispatch(loginSuccess(response.data))

            localStorage.setItem('userInfo', JSON.stringify(response.data))
        } catch (error) {
            // Determine the error message for failed login
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            // Dispatch the failed login action with the appropriate error message
            dispatch(loginFail(errorMessage))
        }
    }
}

export const registerThunk = (registerData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest())

            const response = await axios.post(
                'http://localhost:8800/api/auth/register',
                registerData,
            )

            console.log(
                'response.data: from registerThunk ' +
                    JSON.stringify(response.data),
            )

            dispatch(registerSuccess(response.data))
        } catch (error) {
            // Determine the error message for failed registration
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            // Dispatch the failed login action with the appropriate error message
            dispatch(registerFail(errorMessage))
        }
    }
}

export const logoutThunk = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: actionTypes.USER_LOGOUT })
    dispatch({ type: actionTypes.USER_DETAILS_RESET })
}

export const getUserDetailsThunk = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.USER_DETAILS_REQUEST,
        })

        console.log('getState: ', getState())

        const {
            userLogin: { userInfo },
        } = getState()

        console.log('userInfo: ', userInfo)
        console.log('id in thunk: ', id)

        // const { userLogin } = getState()
        // const { userInfo } = userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // data = response.data
        const { data } = await axios.get(
            `http://localhost:8800/api/users/${id}`,
            config,
        )

        console.log('data in getUserDetails: ', data)

        // data comprise of userId, name, email, profileImg
        dispatch({
            type: actionTypes.USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: actionTypes.USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
