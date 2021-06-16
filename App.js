/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { Root } from "native-base";

import UserList from './Screens/UserList';
import UserInfo from './Screens/UserInfo';
import UserEdit from './Screens/UserEdit';
import CreateUser from './Screens/CreateUser';

export default class App extends React.Component {

  render() {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='UserList'
            screenOptions={{
              headerShown: false,
              gestureEnabled: false
            }}>
            <Stack.Screen
              name="UserList"
              component={UserList}
            />
            <Stack.Screen
              name="UserInfo"
              component={UserInfo}
            />
            <Stack.Screen
              name="UserEdit"
              component={UserEdit}
            />
            <Stack.Screen
              name="CreateUser"
              component={CreateUser}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
};