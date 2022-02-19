import { useState } from 'react'

const Blog = ({blog, likeBlog }) => {
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
          {blog.user.name}
        </div>
      </div>  
    </div>
  )
}

export default Blog