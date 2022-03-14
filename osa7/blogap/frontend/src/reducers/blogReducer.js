import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((b1,b2) => b1.likes < b2.likes ? 1 : -1 )))
    }
}

export const createBlog = blog => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog)
            dispatch(setNotification(`Blog '${newBlog.title}' saved`, 4))
            dispatch(appendBlog(newBlog))
        } catch (exception) {
            dispatch(setNotification('There happened an error. Blog was not saved!', 4))
        }
    }
}

export const { appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer