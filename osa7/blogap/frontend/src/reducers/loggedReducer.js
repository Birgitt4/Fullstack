import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginReducer = createSlice({
    name: 'logged',
    initialState: null,
    reducers: {
        setLoggedUser(state, action) {
            return action.payload
        }
    }
})

export const initializeLogged = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.loggedUser
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setLoggedUser(user))
        }
    }
}

export const login = (creds) => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login(creds)
            window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            blogService.setToken(loggedUser.token)
            dispatch(setLoggedUser(loggedUser))
        } catch (exception) {
            dispatch(setNotification('wrong username or password', 4))
        }
    }
}


export const { setLoggedUser } = loginReducer.actions
export default loginReducer.reducer