import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen, AlbumsScreen,AlbumDetailsScreen} from '../screens';

const Stack = createStackNavigator();

export default function SearchStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
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
