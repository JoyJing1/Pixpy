import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';
import * as actionCreators from '../../actions/photo';
import UploadPhotosButton from '../../components/upload_photos_button';

// const UploadPhotosButton = require('../../components/upload_photos_button');

// const UploadPhotosButton = require('../../components/upload_photos_button');

import Masonry from 'react-masonry-component';


import './style.scss';

const masonryOptions = {
    transitionDuration: 0.1
};

const masonryStyle = {
    // backgroundColor: 'tomato'
    // padding: '10px'
};

class AlbumDetailView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        photos: React.PropTypes.array,
        curr_album: React.PropTypes.object
    };

    componentWillMount() {
        // console.log("containers/AlbumDetail/index.js componentWillMount - about to dataFetchPhotos");
        // const token = this.props.token;
        this.props.actions.dataFetchPhotos(this.props.token, this.props.params.id);
    }

    uploadPhotos() {

    }


    render() {
      const childElements = this.props.photos.map( photo => {
          return (
              <li className="image-element-class"
                  key={photo.id}>
                  <img src={photo.image_url} />
              </li>
           );
      });

        return (
            <div className="container">
                <h2>{this.props.curr_album.title}</h2>
                <h3>{this.props.curr_album.description}</h3>

                <UploadPhotosButton/>

                <Masonry
                  className={'my-gallery-class'}
                  elementType={'ul'}
                  style={masonryStyle}
                  options={masonryOptions}
                  disableImagesLoaded={false}
                  updateOnEachImageLoad={false}
                  >
                  {childElements}
                </Masonry>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  let curr_album = state.photos.curr_album ? state.photos.curr_album[0] : {}
  return {
      statusText: state.auth.statusText,
      photos: state.photos.photos,
      curr_album: curr_album
  };
};

const mapDispatchToProps = (dispatch) => {
    // console.log("containers/AlbumDetail/index.js mapDispatchToProps");
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailView);
