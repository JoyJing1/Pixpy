import fetch from 'isomorphic-fetch';
// import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_PHOTOS_REQUEST, DATA_RECEIVE_PHOTOS } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceivePhotos(data) {
    console.log("static/actions/photo.js dataReceivePhotos(data)");
    console.log(data);
    console.log(data.photos);
    // let photos = data.photos;
    return {
        type: DATA_RECEIVE_PHOTOS,
        payload: {
            photos: data.photos,
            curr_album: data.curr_album
        }
    };
}

export function dataFetchPhotosRequest() {
    console.log("static/actions/photo.js dataFetchPhotosRequest()");
    return {
        type: DATA_FETCH_PHOTOS_REQUEST
    };
}

export function dataFetchPhotos(token, albumId) {
    console.log("static/actions/photo.js dataFetchPhotos()");

    return (dispatch, state) => {
        console.log('about to run dispatch(dataFetchPhotosRequest()); in static/actions/photo.js');
        console.log(dispatch);
        console.log(state);

        console.log("ALBUM ID PASSED TO PHOTO PULL");
        console.log(albumId);
        // debugger;
        dispatch(dataFetchPhotosRequest());
        return fetch(`${SERVER_URL}/api/v1/getalbums/${albumId}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `JWT ${token}`
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                console.log("response within static/actions/photo.js");
                console.log(response);
                // debugger;
                dispatch(dataReceivePhotos(response));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(authLoginUserFailure(error));
                    // dispatch(push('/login'));
                }
            });
    };
}
