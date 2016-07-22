import { createReducer } from '../utils';
import { DATA_RECEIVE_ALBUMS, DATA_FETCH_ALBUMS_REQUEST, DATA_RECEIVE_SINGLE_ALBUM, DATA_CREATE_ALBUM_REQUEST } from '../constants';

const initialState = {
    albums: []
};

export default createReducer(initialState, {
    [DATA_RECEIVE_ALBUMS]: (state, payload) => {
        // console.log('reducers/albums.js DATA_RECEIVE_ALBUMS');
        return Object.assign({}, state, {
            albums: payload.albums,
            isFetching: false
        });
    },
    // Should be able to remove payload?
    [DATA_FETCH_ALBUMS_REQUEST]: (state, payload) => {
        // console.log('reducers/albums.js DATA_FETCH_ALBUMS');
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    [DATA_RECEIVE_SINGLE_ALBUM]: (state, payload) => {
      console.log('reducers/albums.js DATA_RECEIVE_SINGLE_ALBUM');
      // payload.photos currently undefined
      // debugger;
      // state.photos.concat(payload.photo)
      // debugger;
      return Object.assign({}, state, {
          albums: state.albums.concat(payload.album),
          isFetching: false
      });
    },

    [DATA_CREATE_ALBUM_REQUEST]: (state, payload) => {
      console.log('reducers/albums.js DATA_CREATE_ALBUM_REQUEST');
      return Object.assign({}, state, {
          isFetching: true
      });
    }
});
