import { createReducer } from '../utils';
import { DATA_RECEIVE_PHOTOS, DATA_FETCH_PHOTOS_REQUEST } from '../constants';

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
    }
});
