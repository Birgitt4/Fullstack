import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutID

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNote(state, action) {
            const notification = action.payload
            return notification
        },
    }
})

export const { setNote } = notificationSlice.actions

export const setNotification = (notification, time) => {
    return dispatch => {
        dispatch(setNote(notification))
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch(setNote(null))
        }, time*1000)
    }
}
export default notificationSlice.reducer