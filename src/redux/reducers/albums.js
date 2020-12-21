import produce from 'immer';
import _ from 'lodash';
import {SAVE_ALBUM, REMOVE_ALBUM, CLEAR_ALBUMS} from '../types';

const INITIAL_STATE = {
  albums: [],
};

// uses immer produce to handle immutable the state

export default produce((draft, action = {}) => {
  switch (action.type) {
    case SAVE_ALBUM:
      {
        const newState = draft;
        const index = _.findIndex(newState.albums, {
          name: action.item.name,
        });

        if (index !== -1) {
          newState.albums[index] = action.item;
        } else {
          newState.albums.push(action.item);
        }
      }
      break;

    case REMOVE_ALBUM:
      {
        const newState = draft;
        _.remove(newState.albums, {
          name: action.item.name,
        });
      }

      break;
    case CLEAR_ALBUMS:
      return {...INITIAL_STATE};
  }
}, INITIAL_STATE);
