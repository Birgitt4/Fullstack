const BlogForm = ({ newBlog, addBlog, handleBlogChange }) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input type='text' value={newBlog.title} name='t' onChange={handleBlogChange}/>
            </div>
            <div>
                author
                <input type='text' value={newBlog.author} name='a' onChange={handleBlogChange}/>
            </div>
            <div>
                url
                <input type='text' value={newBlog.url} name='u' onChange={handleBlogChange}/>
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm