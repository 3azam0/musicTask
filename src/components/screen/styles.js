import {StyleSheet} from 'react-native';
import {COLORS} from '../../common';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  innerFixed: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.backGround,
  },
  innerScroll: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.backGround,
  },
});
