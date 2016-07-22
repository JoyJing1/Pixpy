import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_ALBUMS_REQUEST, DATA_RECEIVE_ALBUMS, DATA_CREATE_ALBUM_REQUEST, DATA_RECEIVE_SINGLE_ALBUM } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveAlbums(data) {
    console.log("static/actions/album.js dataReceiveAlbums(data)");
    console.log(data);
    console.log(data.albums);
    let albums = data.albums;
    return {
        type: DATA_RECEIVE_ALBUMS,
        payload: {
            albums
        }
    };
}

export function dataFetchAlbumsRequest() {

    console.log("static/actions/album.js dataFetchAlbumsRequest()");
    return {
        type: DATA_FETCH_ALBUMS_REQUEST
    };
}

export function dataFetchAlbums(token) {
    console.log("static/actions/album.js dataFetchAlbums()");

    return (dispatch, state) => {
        console.log('about to run dispatch(dataFetchAlbumsRequest()); in static/actions/album.js');
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
                console.log("response within static/actions/album.js");
                console.log(response);
                dispatch(dataReceiveAlbums(response));
            })
            .catch(error => {
                // console.log(error);
                // debugger;
                if (error.response.status === 401) {
                    dispatch(authLoginUserFailure(error));
                    // dispatch(push('/login'));
                }
            });
    };
}

export function dataCreateAlbumRequest() {
  // console.log("static/actions/photo.js dataCreateAlbumRequest()");
  return {
    type: DATA_CREATE_ALBUM_REQUEST
  };
}

export function dataReceiveSingleAlbum(data) {
  // console.log("static/actions/album.js dataReceiveSingleAlbum(data)");
  return {
    type: DATA_RECEIVE_SINGLE_ALBUM,
    payload: {
      album: data.album
    }
  };
}

export function dataCreateAlbum(token, album) {
  console.log("static/actions/album.js dataCreateAlbum()");

  return (dispatch, state) => {
    console.log('about to run dispatch(dataCreateAlbumRequest()); in static/actions/album.js');

    dispatch(dataCreateAlbumRequest());

    return fetch(`${SERVER_URL}/api/v1/getalbums/`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(
        { title: album.title,
          description: album.description,
        }
      ),
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log("response within static/actions/album.js");
      console.log(response);
      dispatch(dataReceiveSingleAlbum(response));
    })
    .catch(error => {
      console.log(error);
      // debugger;
      if (error.response.status === 401) {
        console.log('Got an error when trying to create album');
        dispatch(authLoginUserFailure(error));
        // dispatch(push('/login'));
      }
    });
  };
}
