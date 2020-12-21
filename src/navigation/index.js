import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomStack from './bottomTabs';

const Stack = createStackNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName= 'Home'>
        <Stack.Screen name="Home" component={BottomStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
