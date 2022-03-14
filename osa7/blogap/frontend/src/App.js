import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'



const App = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    //const [errorMessage, setErrorMessage] = useState(null)
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.loggedUser
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            //setErrorMessage('wrong username or password')
            //setTimeout(() => {
            //    setErrorMessage(null)
            //}, 4000)
            dispatch(setNotification('wrong username or password', 4))
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const addBlog = async (newBlog) => {
        try {
            blogFormRef.current.toggleVisibility()
            const returnedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog))
            /*setErrorMessage(
                `Blog '${newBlog.title}' saved`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)*/
            dispatch(setNotification(`Blog '${newBlog.title}' saved`, 4))
        } catch (exception) {
            /*setErrorMessage('There happened an error. Blog was not saved!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)*/
            dispatch(setNotification('There happened an error. Blog was not saved!', 4))
        }

    }

    const deleteBlog = async (blog) => {
        try {
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
            /*setErrorMessage(`Blog '${blog.title}' were removed`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)*/
            dispatch(setNotification(`Blog '${blog.title}' were removed`, 4))
        } catch (exception) {
            /*setErrorMessage('error')
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)*/
            dispatch(setNotification('error', 4))
        }
    }

    //Userista jää vain id joten nimi katoaa näkyvistä jos blogin
    //tietoihin lisää userin koko olion tulee vastauksena 400
    const likeBlog = async (updatedBlog) => {
        try {
            const returnedBlog = await blogService.update(updatedBlog)
            const updatedBlogs = blogs.filter(b => b.id !== updatedBlog.id)
            dispatch(setNotification(`you liked blog: ${updatedBlog.title}`, 4))
            setBlogs(updatedBlogs.concat(returnedBlog))
        } catch (exception) {
            /*setErrorMessage('error occured')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)*/
            dispatch(setNotification('error occured', 3))
        }
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='add new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )


    if (user === null) {
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

    return (
        <div>
            <Notification message={notification} />
            <h2>blogs</h2>
            <p>
                {user.name} logged in
                <button onClick={logout}>logout</button>
            </p>
            {blogForm()}
            {blogs.sort((b1,b2) => b1.likes < b2.likes ? 1 : -1 ).map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} remove={deleteBlog}/>
            )}
        </div>
    )
}

export default App
