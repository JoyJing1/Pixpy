import { createReducer } from '../utils';
import { DATA_RECEIVE_PHOTOS, DATA_FETCH_PHOTOS_REQUEST, DATA_RECEIVE_SINGLE_PHOTO, DATA_CREATE_PHOTO_REQUEST } from '../constants';

const initialState = {
    photos: []
};

export default createReducer(initialState, {
    [DATA_RECEIVE_PHOTOS]: (state, payload) => {
        console.log('reducers/photos.js DATA_RECEIVE_PHOTOS');
        // payload.photos currently undefined
        // debugger;
        return Object.assign({}, state, {
            photos: payload.photos,
            curr_album: payload.curr_album,
            isFetching: false
        });
    },
    [DATA_FETCH_PHOTOS_REQUEST]: (state, payload) => {
        console.log('reducers/photos.js DATA_FETCH_PHOTOS');
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [DATA_RECEIVE_SINGLE_PHOTO]: (state, payload) => {
        console.log('reducers/photos.js DATA_RECEIVE_SINGLE_PHOTO');
        // payload.photos currently undefined
        // debugger;
        // state.photos.concat(payload.photo)
        return Object.assign({}, state, {
            photos: state.photos.concat(payload.photo),
            isFetching: false
        });
    },
    [DATA_CREATE_PHOTO_REQUEST]: (state, payload) => {
        console.log('reducers/photos.js DATA_CREATE_PHOTOS');
        return Object.assign({}, state, {
            isFetching: true
        });
    }
});
