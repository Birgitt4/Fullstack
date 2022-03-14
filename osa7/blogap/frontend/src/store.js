import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import loggedReducer from './reducers/loggedReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        users: userReducer,
        blogs: blogReducer,
        logged: loggedReducer
    }
})

export default store