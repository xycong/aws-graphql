import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'
import { compose, graphql } from 'react-apollo'
import ListCities from './queries/ListCities'
import NewCitiesSubscription from './subscriptions/NewCitySubscription';
import { ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import City from './City';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerImage: {
    width: '100%',
    height: 40
  },
  listItem: {
    borderBottomColor: '#ededed'
  }
})

class Cities extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        resizeMode='contain'
        style={styles.headerImage}
        source={require('./assets/citieslogo.png')}
      />
    )
  }
}
 
const CitiesWithData = compose(
  graphql(ListCities, {
      props: props => ({
        cities: props.data.listCities ? props.data.listCities.items : [],
      })
  })
)(Cities)

const routes = {
  CitiesWithData: {
    screen: CitiesWithData
  },
  City: {
    screen: City
  }
}

const config = {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0091EA'
    },
    headerTitleStyle: {
      color: 'white'
    }
  }
}

export default StackNavigator(routes, config)