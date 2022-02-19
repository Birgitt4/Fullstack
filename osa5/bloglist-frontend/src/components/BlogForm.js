import { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const handleChange = (event) => {
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

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({
            title: '',
            author: '',
            url: '',
        })
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input type='text' value={newBlog.title} name='t' onChange={handleChange}/>
                </div>
                <div>
                    author
                    <input type='text' value={newBlog.author} name='a' onChange={handleChange}/>
                </div>
                <div>
                    url
                    <input type='text' value={newBlog.url} name='u' onChange={handleChange}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: propTypes.func.isRequired
}

export default BlogForm