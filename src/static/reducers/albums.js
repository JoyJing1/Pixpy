import { createReducer } from '../utils';
import { DATA_RECEIVE_ALBUMS, DATA_FETCH_ALBUMS } from '../constants';

const initialState = {
    albums: []
};

export default createReducer(initialState, {
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

// const album = (state, action) => {
//     switch (action.type) {
//         case 'ADD_ALBUM':
//             return {
//                 id: action.id,
//                 text: action.text,
//                 title: state.title,
//                 description: state.description
//             };
//
//         default:
//             return state;
//     }
// };
//
// const albums = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_ALBUM':
//             return [
//                 ...state,
//                 album(undefined, action)
//             ];
//         default:
//             return state;
//     }
// };
//
// export default albums;
