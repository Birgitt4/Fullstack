import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import Notification from './Notification'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
//import blogService from '../services/blogs'


const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
    const notification = useSelector(state => state.notification)

    //like ja delete ei käytössä
    /*const deleteBlog = async (blog) => {
        try {
            await blogService.deleteBlog(blog.id)
            //setBlogs(blogs.filter(b => b.id !== blog.id))
            setErrorMessage(`Blog '${blog.title}' were removed`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
            dispatch(setNotification(`Blog '${blog.title}' were removed`, 4))
        } catch (exception) {
            setErrorMessage('error')
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
            dispatch(setNotification('error', 4))
        }
    }

    //Userista jää vain id joten nimi katoaa näkyvistä jos blogin
    //tietoihin lisää userin koko olion tulee vastauksena 400
    const likeBlog = async (updatedBlog) => {
        try {
            //const returnedBlog =
            await blogService.update(updatedBlog)
            //const updatedBlogs = blogs.filter(b => b.id !== updatedBlog.id)
            dispatch(setNotification(`you liked blog: ${updatedBlog.title}`, 4))
            //setBlogs(updatedBlogs.concat(returnedBlog))
        } catch (exception) {
            setErrorMessage('error occured')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            dispatch(setNotification('error occured', 3))
        }
    }*/

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='add new blog' ref={blogFormRef}>
            <BlogForm />
        </Togglable>
    )

    return (
        <div>
            <Notification message={notification} />
            <h2>blogs</h2>
            {blogForm()}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )
}

export default Blogs