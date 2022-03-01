import service from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes+1
      }
      return state.map(a => a.id !== id ? a : votedAnecdote).sort((a1,a2) => a1.votes <= a2.votes ? 1 : -1)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'SET_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const newAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: anecdotes
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await service.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await service.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    await service.updateVotes(anecdote)
    dispatch(addVote(anecdote.id))
  }
}

export default reducer