import { compose, graphql } from 'react-apollo'
import CreateCityMutation from './mutations/CreateCity'

class AddCity extends React.Component {
}
 
export default compose(
  graphql(CreateCityMutation, {
    props: props => ({
      onAdd: city => props.mutate({
        variables: city,
        optimisticResponse: {
          __typename: 'Mutation',
          createCity: { ...city, __typename: 'City' }
        },
        update: (proxy, { data: {createCity } }) => {
          const data = proxy.readQuery({ query: ListCities });
          data.listCities.item.unshift(createCity);
          proxy.writeQuery({ query: ListCities, data });
        }
      });
    });
  });
)(AddCity)