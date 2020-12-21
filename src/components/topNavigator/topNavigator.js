import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../common';
import {useSelector, useDispatch} from 'react-redux';
import {clearAlbums} from '../../redux/actions';
const TopNavigatorComponent = ({
  title,
  subtitle,
  alignment,
  accessoryLeft,
  accessoryRight,
  backColor,
}) => {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };

  const dispatch = useDispatch();

  const clearSavedAlbums = () => {
    dispatch(clearAlbums());
  }; 
  const MenuIcon = (style) => (
    <Icon {...style} name="menu-outline" fill={COLORS.black} />
  );

  const BackIcon = (style) => (
    <Icon {...style} fill="black" name="arrow-back" />
  );

  const clearIcon = (style) => (
    <Icon {...style} fill="black" name="trash-2-outline" />
  );


  const openDrawer = () => {
    navigation.openDrawer();
  };
  const exit = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const ClearAction = () => (
    <TopNavigationAction icon={clearIcon} onPress={clearSavedAlbums} />
  );
  const DrawerAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={openDrawer} />
  );

  return (
    <>
      <TopNavigation
        title={<Text style={styles.titleStyle}>{title}</Text>}
        style={{backgroundColor: backColor}}
        subtitle={subtitle}
        alignment={alignment}
        accessoryLeft={accessoryLeft === 'menu' && DrawerAction}
        accessoryRight={accessoryRight === 'clear' && ClearAction}
      />
      <Divider />
    </>
  );
};

TopNavigatorComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  backColor: PropTypes.string,
  alignment: PropTypes.oneOf(['start', 'center']),
  accessoryLeft: PropTypes.oneOf(['back', 'menu', 'exit']),
  accessoryRight: PropTypes.string,

};

TopNavigatorComponent.defaultProps = {
  title: '',
  subtitle: '',
  alignment: 'center',
  accessoryLeft: '',
  backColor: COLORS.white,
  accessoryRight: '',
};
const styles = StyleSheet.create({
  titleStyle: {
    color: 'black',
    fontSize: 21,
  },
 
  
});

export const TopNavigator = TopNavigatorComponent;
