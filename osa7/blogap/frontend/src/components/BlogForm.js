import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
    const dispatch = useDispatch()
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const handleChange = (event) => {
        if (event.target.id === 't') {
            setNewBlog({
                ...newBlog,
                title: event.target.value
            })
        }
        else if (event.target.id === 'a') {
            setNewBlog({
                ...newBlog,
                author: event.target.value
            })
        }

        if (event.target.id === 'u') {
            setNewBlog({
                ...newBlog,
                url: event.target.value
            })
        }
    }

    const addBlog = (event) => {
        event.preventDefault()
        dispatch(createBlog(newBlog))
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
                    <input type='text' value={newBlog.title} id='t' onChange={handleChange} />
                </div>
                <div>
                    author
                    <input type='text' value={newBlog.author} id='a' onChange={handleChange}/>
                </div>
                <div>
                    url
                    <input type='text' value={newBlog.url} id='u' onChange={handleChange}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm