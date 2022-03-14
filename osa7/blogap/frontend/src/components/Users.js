import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserTable = (props) => {
    return (
        <tr>
            <td><Link to={`/users/${props.user.id}`}>{props.user.name}</Link></td><td>{props.user.blogs.length}</td>
        </tr>
    )
}

const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th><th>blogs created</th>
                    </tr>
                    {users.map((user) =>
                        <UserTable key={user.id} user={user} />
                    )}
                </tbody>
            </table>
        </div>
    )

}

export default Users