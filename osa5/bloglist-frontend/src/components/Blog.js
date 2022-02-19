import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, likeBlog, remove }) => {
    const [viewInfo, setViewInfo] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const hideWhenView = { display: viewInfo ? 'none' : '' }
    const showWhenView = { display: viewInfo ? '' : 'none' }

    const logged = JSON.parse(window.localStorage.getItem('loggedUser'))
    const ownBlog = { display: blog.user.username === logged.username ? '' : 'none' }

    const toggleVisibility = () => {
        setViewInfo(!viewInfo)
    }

    const like = (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes+1
        }
        likeBlog(updatedBlog)
    }

    const deleteBlog = (event) => {
        event.preventDefault()
        const res = window.confirm(`Remove blog '${blog.title}' by ${blog.author} `)
        if (res) remove(blog)
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button style={hideWhenView} onClick={toggleVisibility}>view</button>
                <button style={showWhenView} onClick={toggleVisibility}>hide</button>
                <div style={showWhenView}>
                    {blog.url}<br/>
          likes {blog.likes}
                    <button onClick={like}>like</button><br/>
                    {blog.user.name}<br/>
                    <button style={ownBlog} onClick={deleteBlog}>remove</button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: propTypes.object.isRequired
}

export default Blog