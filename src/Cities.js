// TODOimport { compose, graphql } from 'react-apollo'
import ListCities from './queries/ListCities'
 
class Cities extends React.Component {
  // class definition here
  // now have access to this.props.cities
}
 
export default compose(
  graphql(ListCities, {
      props: props => ({
        cities: props.data.listCities ? props.data.listCities.items : [],
      })
  })
)(CityList)