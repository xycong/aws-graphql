import { compose, graphql } from 'react-apollo'
import ListCities from './queries/ListCities'
import NewCitiesSubscription from './subscriptions/NewCitySubscription';
 
class Cities extends React.Component {
}
 
export default compose(
  graphql(ListCities, {
      props: props => ({
        cities: props.data.listCities ? props.data.listCities.items : [],
      })
  })
)(CityList)