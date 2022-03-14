import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'

import {
    Routes, Route, Link
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogged, login, setLoggedUser } from './reducers/loggedReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        dispatch(initializeLogged())
    },[])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const users = useSelector(state => state.users)
    const notification = useSelector(state => state.notification)
    const loggedUser = useSelector(state => state.logged)

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login({ username, password }))
        setUsername('')
        setPassword('')
    }

    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        dispatch(setLoggedUser(null))
    }

    if (loggedUser === null) {
        return (
            <div>
                <Notification message={notification} />
                <h1>log in to application</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            id='username' type='text' value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            id='password' type='password' value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id='login-button' type='submit'>login</button>
                </form>
            </div>
        )
    }

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <div>
                <Link style={padding} to='/' >blogs</Link>
                <Link style={padding} to='/users' >users</Link>
                {loggedUser.name} logged in <button onClick={logout}>logout</button>
            </div>

            <Routes>
                <Route path='/' element={<Blogs />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<User users={users} />} />
            </Routes>
        </div>
    )
}

export default App
