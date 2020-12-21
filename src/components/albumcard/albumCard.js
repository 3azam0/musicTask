import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Icon, Text} from '@ui-kitten/components';
import {COLORS} from '../../common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {saveAlbum, removeAlbum} from '../../redux/actions';

export const AlbumCard = ({
  albunName,
  artistName,
  source,
  listners,
  onAlbumPress,
  item,
  save,
}) => {
  const savedAlbums = useSelector((state) => state.albumsState.albums);
  let itemExist = _.findIndex(savedAlbums, {name: albunName});
  const [liked, setLiked] = useState(itemExist !== -1);
  const onLikePress = (item) => {
    if (!liked) {
      dispatch(saveAlbum(item));
      setLiked(true);
    } else if (liked) {
      dispatch(removeAlbum(item));
      setLiked(false);
    }
  };
  const dispatch = useDispatch();

  const saveAlbumHndler = (item) => {
    dispatch(saveAlbum(item));
  };
  return (
    <TouchableOpacity onPress={onAlbumPress} style={styles.artistCard}>
      <Image resizeMode="contain" source={{uri: source}} style={styles.img} />
      <View style={styles.albumDetails}>
        <Text style={styles.artistName}>{artistName}</Text>
        <Text style={styles.albumName}>{albunName}</Text>
        <Text style={styles.listeners}>{listners} listeners</Text>
      </View>
      {save && (
        <TouchableOpacity onPress={() => onLikePress(item)}>
          <Icon
            name={!liked ? 'bookmark-outline' : 'bookmark'}
            fill={COLORS.warning}
            style={styles.icn}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  artistCard: {
    flexDirection: 'row',
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: wp(30),
    height: hp(15),
    marginBottom: 5,
  },
  albumName: {
    color: COLORS.success,
    marginBottom: 3,
    fontWeight: 'bold',
    width: 150,
  },
  artistName: {
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  listeners: {
    textAlign: 'center',
    marginBottom: 3,
    color: COLORS.danger,
  },
  albumDetails: {
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icn: {
    width: 30,
    height: 30,
  },
});

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  albunName: PropTypes.string,
  listners: PropTypes.number,
  source: PropTypes.string,
  onSavePress: PropTypes.func,
  onAlbumPress: PropTypes.func,
};
