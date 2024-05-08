import * as actionTypes from '../constants/postActionTypes.js'
import axios from 'axios'

export const listPostsThunk = (category) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.POST_LIST_REQUEST })

        const { data } = await axios.get(
            `http://localhost:8800/api/posts${category}`,
        )
        dispatch({ type: actionTypes.POST_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: actionTypes.POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
