import {SAVE_ALBUM, REMOVE_ALBUM, CLEAR_ALBUMS} from '../types';

export const saveAlbum = (item) => ({
  type: SAVE_ALBUM,
  item,
});

export const removeAlbum = (item) => ({
  type: REMOVE_ALBUM,
  item,
});

export const clearAlbums = () => ({
  type: CLEAR_ALBUMS,
});
