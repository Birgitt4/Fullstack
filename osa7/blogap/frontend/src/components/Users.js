import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import service from '../services/users'
import Notification from './Notification'


const User = (props) => {
    return (
        <tr>
            <td>{props.name}</td><td>{props.blogs}</td>
        </tr>
    )
}

const Users = () => {
    const notification = useSelector(state => state.notification)
    const [users, setUsers] = useState([])

    useEffect(() => {
        service.getAll().then(users =>
            setUsers( users )
        )
    }, [])

    return (
        <div>
            <Notification message={notification} />
            <h2>users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th><th>blogs created</th>
                    </tr>
                    {users.map((user) =>
                        <User key={user.id} name={user.name} blogs={user.blogs.length} />
                    )}
                </tbody>
            </table>
        </div>
    )

}

export default Users