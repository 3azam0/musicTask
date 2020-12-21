import React from 'react';
import PropTypes from 'prop-types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import HomeStack from './homeStack';
import SearchStack from './searchStack';

const Tab = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Search" icon={SearchIcon} />
  </BottomNavigation>
);

export default function BottomStack() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
    </Tab.Navigator>
  );
}

BottomTabBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  state: PropTypes.shape({
    index: PropTypes.number,
    routeNames: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
