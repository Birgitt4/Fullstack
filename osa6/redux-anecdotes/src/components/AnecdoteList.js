import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const voteAnecdote = (id) => {
        dispatch(vote(id))
    }

    return (
        <div>
        {anecdotes.sort((a1,a2) => a1.votes <= a2.votes ? 1 : -1).map(anecdote =>
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