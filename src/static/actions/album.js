import fetch from 'isomorphic-fetch';
// import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_ALBUMS_REQUEST, DATA_RECEIVE_ALBUMS } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveAlbums(data) {
  // console.log("static/actions/album.js dataReceiveAlbums(data)");
  // console.log(data);
  // console.log(data.albums);
  let albums = data.albums;
  return {
    type: DATA_RECEIVE_ALBUMS,
    payload: {
      albums
    }
  };
}

export function dataFetchAlbumsRequest() {
  // console.log("static/actions/album.js dataFetchAlbumsRequest()");
  return {
    type: DATA_FETCH_ALBUMS_REQUEST
  };
}

export function dataFetchAlbums(token) {
  // console.log("static/actions/album.js dataFetchAlbums()");

  return (dispatch, state) => {
    // console.log('about to run dispatch(dataFetchAlbumsRequest()); in static/actions/album.js');
    // console.log(dispatch);
    // console.log(state);

    dispatch(dataFetchAlbumsRequest(token));
    return fetch(`${SERVER_URL}/api/v1/getalbums/`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      // console.log("response within static/actions/album.js");
      // console.log(response);
      dispatch(dataReceiveAlbums(response));
    })
    .catch(error => {
      // console.log(error);
      // debugger;
      if (error.response.status === 401) {
        dispatch(authLoginUserFailure(error));
        dispatch(push('/login'));
      }
    });
  };
}
