import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types'
import {StyleSheet, View, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import _ from 'lodash';
import {Screen, Spinner, AlbumCard} from '../../components';
import api from '../../services/api';

export const AlbumsScreen = ({navigation, route}) => {
  const [albums, setAlbums] = useState(null);

  const artist = route.params.artist;
  const [{loading}, execute] = api.useAxios(
    {
      url: '?method=artist.gettopalbums',
      method: 'get',
      params: {
        artist: artist,
      },
    },
    {manual: true},
  );

  useEffect(() => {
    execute()
      .then((res) => {
        setAlbums(res.data.topalbums.album);
      })
      .catch(() => {
        console.log('failed');
      });
  }, []);

  const renderItem = ({item}) => {
    const url = '#text';
    return (
      <AlbumCard
        item={item}
        artistName={item?.artist.name}
        albunName={item?.name}
        source={item?.image[2][url]}
        listners={item?.playcount}
        save
        onAlbumPress={() =>
          navigation.navigate('AlbumDetails', {
            artist: item?.artist.name,
            album: item?.name,
          })
        }
      />
    );
  };

  return (
    <>
      <Spinner visible={loading} />
      <Screen
        type="scroll"
        navCofig={{
          title: 'Albums',
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
    </>
  );
};
const styles = StyleSheet.create({
  container: {width: wp(95)},
  flatList: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 15,
    marginHorizontal: 5,
  },
});
