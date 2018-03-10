import { compose, graphql } from 'react-apollo'
import AddCityMutation from './mutations/AddCity'
 
class AddCity extends React.Component {
  // class definition here
  // now have access to this.props.onAdd()
}
 
export default compose(
  graphql(AddCityMutation, {
    props: props => ({
      onAdd: city => props.mutate({
        variables: city
      })
    })
  })
)(AddCity)