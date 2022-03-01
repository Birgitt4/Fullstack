import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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
        setTimeout(() => {
            dispatch(setNote(''))
        }, time*1000)
    }
}
export default notificationSlice.reducer