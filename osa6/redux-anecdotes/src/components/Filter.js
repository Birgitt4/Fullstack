//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    //const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        //dispatch(setFilter(event.target.value))
        // input-kentän arvo muuttujassa event.target.value
        props.setFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }
  
    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}
  
//export default Filter

const mapDispatchToProps = {
    setFilter,
}
const ConnectedFilter = connect(
    null,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter