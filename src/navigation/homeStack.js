import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, AlbumDetailsScreen} from '../screens';

const Stack = createStackNavigator();

export default function HomeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AlbumDetails"
        component={AlbumDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
