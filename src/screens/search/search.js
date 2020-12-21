import React, {useState} from 'react';
// import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Icon, Text, Input} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Screen, Spinner} from '../../components';
import api from '../../services/api';
import {COLORS} from '../../common';

export const SearchScreen = ({navigation}) => {
  const [result, setResult] = useState(null);
  const [artist, setArtist] = useState('');

  const [{loading}, execute] = api.useAxios(
    {
      url: '?method=artist.search',
      method: 'get',
      params: {
        artist: artist,
      },
    },
    {manual: true},
  );

  const searchHandler = () => {
    execute().then((res) => {
      setResult(res.data.results.artistmatches.artist);
    });
  };
  const renderIcon = (props) => (
    <TouchableOpacity onPress={searchHandler}>
      <Icon {...props} name="search-outline" fill={COLORS.white} />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const url = '#text';
    return (
      <TouchableOpacity
        style={styles.artistCard}
        onPress={() => navigation.navigate('Albums', {artist: item?.name})}>
        <Image
          resizeMode="contain"
          source={{
            uri: item.image[2][url],
          }}
          style={styles.img}
        />
        <Text style={styles.artistName}>{item?.name}</Text>
        <Text style={styles.listeners}> {item?.listeners} listeners</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Spinner visible={loading} />
      <Screen
        type="scroll"
        navCofig={{
          title: 'Search',
        }}>
        <View style={styles.container}>
          <Input
            value={artist}
            placeholder="Search For Music"
            accessoryRight={renderIcon}
            onChangeText={(nextValue) => setArtist(nextValue)}
            style={styles.inpt}
            textStyle={styles.txt}
          />
          <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginHorizontal: 5,
            }}
            numColumns={2}
          />
        </View>
      </Screen>
    </>
  );
};
const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  inpt: {
    backgroundColor: COLORS.black,
    borderColor: 'transparent',
  },
  txt: {
    color: COLORS.white,
  },
  artistCard: {
    width: wp(40),
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  img: {
    width: wp(30),
    height: hp(15),
    marginBottom: 5,
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
    color: 'red',
  },
});
