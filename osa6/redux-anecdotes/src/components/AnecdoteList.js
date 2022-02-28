import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes}) => {
        return anecdotes.filter(a => a.content.includes(filter)) 
    })
    const dispatch = useDispatch()

    const voteAnecdote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(setNotification(`you voted '${anecdote.content}'`))
        dispatch(vote(id))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }


    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
              </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList