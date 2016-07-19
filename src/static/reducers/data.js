import { createReducer } from '../utils';
import { DATA_RECEIVE_PROTECTED_DATA, DATA_FETCH_PROTECTED_DATA_REQUEST } from '../constants';

const initialState = {
    data: null,
    albums: [],
    isFetching: false
};

export default createReducer(initialState, {
    [DATA_RECEIVE_PROTECTED_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },

    [DATA_FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    // Need to define DATA_RECEIVE_ALBUMS
    [DATA_RECEIVE_ALBUMS]: (state, payload) => {
        return Object.assign({}, state, {
            albums: payload.albums,
            isFetching: false
        });
    },

    [DATA_FETCH_ALBUMS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    }
});
