import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import mainScreen from "./src/screens/mainScreen";

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import searchScreen from './src/screens/searchScreen';
import infoScreen from './src/screens/infoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="mainScreen" headerMode = 'none'>
          <Stack.Screen name="mainScreen" component={mainScreen} />
          <Stack.Screen name="searchScreen" component={searchScreen} />
          <Stack.Screen name="infoScreen" component={infoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
