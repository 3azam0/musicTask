import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native';
import {Text, Divider, List, ListItem} from '@ui-kitten/components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import _ from 'lodash';
import {Screen, AlbumCard,Spinner} from '../../components';
import api from '../../services/api';
import {COLORS} from '../../common';

export const AlbumDetailsScreen = ({route}) => {
  const [info, setInfo] = useState(null);

  const artist = route.params.artist;
  const album = route.params.album;

  const [{loading}, execute] = api.useAxios(
    {
      url: '?method=album.getinfo',
      method: 'get',
      params: {
        artist: artist,
        album: album,
      },
    },
    {manual: true},
  );

  useEffect(() => {
    execute()
      .then((res) => {
        setInfo(res.data.album);
      })
      .catch(() => {
        console.log('failed');
      });
  }, []);

  const renderItem = () => {
    const url = '#text';
    return (
      <AlbumCard
      item={info}
        artistName={info?.artist}
        albunName={info?.name}
        source={info?.image[2][url]}
        listners={info?.listeners}
      />
    );
  };
  const renderListItem = ({item, index}) => (

    <ListItem
      title={`${index + 1}-  ${item.name} `}

    />
  );
  return (
      <>
            <Spinner visible={loading} />

    <Screen
      type="scroll"
      navCofig={{
        title: 'AlbumDetails',
      }}>
      <View style={styles.container}>
        {renderItem()}
        <View>
          <Text style={styles.tracks}>Album tracks: {info?.tracks.track.length}</Text>
          <List
            data={info?.tracks.track}
            ItemSeparatorComponent={Divider}
            renderItem={renderListItem}
            style={styles.list}
          />
        </View>
      </View>
    </Screen>
    </>
  );
};
const styles = StyleSheet.create({
  container: {width: wp(90)},
  tracks: {
    fontWeight: 'bold',
    marginBottom:10,
    color:COLORS.danger
  },
  list:{
      marginBottom:20
  }
});
