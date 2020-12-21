import React from 'react';
// import PropTypes from 'prop-types'
import {StyleSheet, View, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {Screen, AlbumCard} from '../../components';

export const HomeScreen = ({navigation}) => {
  const albums = useSelector((state) => state.albumsState.albums);

  const renderItem = ({item}) => {
    const url = '#text';
    return (
      <AlbumCard
        onAlbumPress={() =>
          navigation.navigate('AlbumDetails', {
            artist: item?.artist.name,
            album: item?.name,
          })
        }
        item={item}
        artistName={item?.artist.name}
        albunName={item?.name}
        source={item?.image[2][url]}
        listners={item?.playcount}
        save
      />
    );
  };

  return (
    <Screen
      type="scroll"
      navCofig={{
        title: 'Home',
        accessoryRight: 'clear',
      }}>
      <View style={styles.container}>
        <FlatList
          data={albums}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatList}
        />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {width: wp(90)},
  flatList: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 15,
    marginHorizontal: 5,
  },
});
