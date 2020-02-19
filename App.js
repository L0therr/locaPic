import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';

//reducers
import addUserName from './reducers/addusername'


//redux
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({addUserName}));

//composants
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';

var BottomNavigator = createBottomTabNavigator(
  {
    Map: MapScreen,
    Chat: ChatScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Map') {
          iconName = 'ios-compass';
        } else if (navigation.state.routeName == 'Chat') {
          iconName = 'ios-chatboxes';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
);

var StackNav = createStackNavigator({
  Home: HomeScreen,
  AppNav: BottomNavigator,
}, {
  headerMode: "none",
})

const Navigation = createAppContainer(StackNav);


function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );

}



export default App;