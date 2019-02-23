/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createNavigator, StackRouter, createAppContainer} from 'react-navigation';
import React  from 'react';
import HomeScreen from './HomeScreen';
import Stations from './Stations';
import Line from './Line';
import Searchline from './Searchline';
import Lineinfo from './Lineinfo';
import Save from './Save';
import Maps from './Maps';
import AnimatedMarkers from './animatedMap';
import MapTest from './mapsTest';



const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Stations: {
    screen: Stations
  },
  Line: {
    screen: Line
  },
  Searchline:{
    screen: Searchline
  },
  Lineinfo: {
    screen: Lineinfo
  },
  Save: {
    screen: Save
  },
  Maps: {
    screen: Maps
  },
  AnimatedMarkers: {
    screen: AnimatedMarkers
  },
  MapTest: {
    screen: MapTest
  }
});
const App = createAppContainer(RootStack)
export default App;