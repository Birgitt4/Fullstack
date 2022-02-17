import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

/*
5.4 toteuta notifikaatiot
*/

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  
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
    console.log('logging in: ', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(
        `Blog '${newBlog.title}' saved`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      setErrorMessage('There happened an error. Blog was not saved!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
    
  }

  const handleBlogChange = (event) => {
    if (event.target.name === 't') {
      setNewBlog({
        ...newBlog,
        title: event.target.value
      })
    }
    else if (event.target.name === 'a') {
      setNewBlog({
        ...newBlog,
        author: event.target.value
      })
    }

    if (event.target.name === 'u') {
      setNewBlog({
        ...newBlog,
        url: event.target.value
      })
    }
    
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
               type='text' value={username} name='Username'
               onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
            <input
             type='password' value={password} name='Password'
             onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>
      <h2>create new</h2>
      <NewBlog newBlog={newBlog} addBlog={addBlog} handleBlogChange={handleBlogChange}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
