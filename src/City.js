import { compose, graphql } from 'react-apollo'


import CreateLocation from './mutations/CreateLocation'
import ListLocations from './queries/ListLocations'
import NewLocationSubscription from './subscriptions/NewLocationSubscription'

class City extends React.Component {
}

export default compose(
  graphql(CreateLocation, {
    options: {
      errorPolicy: 'ignore'
    },
    props: props => ({
      onAdd: location => props.mutate({
        variables: location,
        optimisticResponse: {
          __typename: 'Mutation',
          createLocation: { ...location,  __typename: 'Location' }
        },
        update: (proxy, { data: { createLocation } }) => {
          const data = proxy.readQuery({ query: ListLocations, variables: { cityId: createLocation.cityId } });
          data.listLocations.items.unshift(createLocation);
          proxy.writeQuery({ query: ListLocations, data, variables: { cityId: createLocation.cityId } });
        }
      })
    })
  }),
  graphql(ListLocations, {
    options: props => {
      const { id } = props.navigation.state.params.city
      return {
        variables: { cityId: id },
        fetchPolicy: 'cache-and-network'
      }
    },
    props: props => {
      return {
        locations: props.data.listLocations ? props.data.listLocations.items : [],
        subscribeToNewLocations: params => {
          props.data.subscribeToMore({
            document: NewLocationSubscription,
            updateQuery: (prev, { subscriptionData: { data : { onCreateLocation } } }) => {
              return {
                ...prev,
                listLocations: {
                  items: [onCreateLocation, ...prev.listLocations.items.filter(location => location.id !== onCreateLocation.id)],
                  __typename: 'LocationConnection'
                }
              }
            }
          });
        }
      }
    }
})
)(City)