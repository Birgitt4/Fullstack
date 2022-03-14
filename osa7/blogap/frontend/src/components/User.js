import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = (props) => {
    return (
        <li>
            {props.title}
        </li>
    )
}

const User = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(u => u.id === id)
    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.map(blog =>
                <Blog key={blog.id} title={blog.title} />
            )}
        </div>
    )
}

export default User