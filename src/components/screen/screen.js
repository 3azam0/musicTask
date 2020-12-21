import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Layout} from '@ui-kitten/components';
import styles from './styles';
import {TopNavigator} from '../topNavigator/topNavigator';

const ScreenWithoutScrolling = ({
  statusBar,
  style,
  hasNav,
  navCofig,
  children,
}) => {
  return (
    <>
      <StatusBar barStyle={statusBar} />
      <SafeAreaView style={styles.container}>
        {hasNav && <TopNavigator {...navCofig} />}
        <Layout style={[styles.innerFixed, style]}>{children}</Layout>
      </SafeAreaView>
    </>
  );
};

const ScreenWithScrolling = ({
  statusBar,
  style,
  hasNav,
  navCofig,
  children,
}) => {
  return (
    <>
      <StatusBar barStyle={statusBar} />
      <SafeAreaView style={styles.container}>
        <Layout style={styles.container}>
          {hasNav && <TopNavigator {...navCofig} />}
          <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.innerScroll, style]}>
            {children}
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export const Screen = (props) => {
  if (props.type === 'fixed') {
    return <ScreenWithoutScrolling {...props} />;
  }
  return <ScreenWithScrolling {...props} />;
};

const propTypes = {
  statusBar: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  hasNav: PropTypes.bool,
  navCofig: PropTypes.shape({}),
};
ScreenWithoutScrolling.propTypes = propTypes;
ScreenWithScrolling.propTypes = propTypes;

const defaultProps = {
  statusBar: 'light-content',
  style: {},
  hasNav: true,
  navCofig: {},
};
ScreenWithoutScrolling.defaultProps = defaultProps;
ScreenWithScrolling.defaultProps = defaultProps;

Screen.propTypes = {type: PropTypes.string};
Screen.defaultProps = {type: 'fixed'};
