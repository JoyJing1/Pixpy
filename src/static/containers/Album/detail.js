import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/photo';
// import { dataFetchPhotos, dataCreatePhoto } from '../../actions/photo';
// import { dataCreatePhoto } from '../../actions/photo';
import UploadPhotosButton from '../../components/upload_photos_button';
import CLOUDINARY_OPTIONS from '../../components/cloudinary_options';
import { ModalManager } from 'react-dynamic-modal';

import AddCaption from '../../components/add_caption';
import PhotoDetail from '../../components/photo_detail';

// import Masonry from 'react-masonry-component';

import './style.scss';

const STYLE = { content: { background: 'black',
                            border: "2px solid #828282",
                            borderRadius: "10px" },
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)'}
              };


// const masonryOptions = {
//   transitionDuration: 0
// };
//
// const masonryStyle = {
//   // backgroundColor: 'tomato'
//   // padding: '10px'
// };

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

  openCaptionModal(image_url) {
    ModalManager.open(<AddCaption onRequestClose={() => true} imageUrl={image_url}/>);
  }

  openPhotoModal(e) {
    e.preventDefault();
    // console.log(this);
    // debugger;
    // const image_url = this.image_url;
    // const caption = this.caption;


    ModalManager.open(<PhotoDetail
      onRequestClose={() => true}
      imageUrl={this.image_url}
      caption={this.caption}
      style={STYLE}/>);
  }

  createPhoto(photo) {
    const dataCreatePhoto = this.props.actions.dataCreatePhoto;
    dataCreatePhoto(window.sessionStorage.token, photo);
  }

  upload(e) {
    e.preventDefault(e);
    const that = this;
    const album = this.props.curr_album;

    cloudinary.openUploadWidget(
      CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === null) {
          // console.log("Upload succeeded in upload_photos_button.jsx");
          for (let i = 0; i < images.length; i++) {
            const image_url = images[i].secure_url
            const photo = { image_url: image_url, album_id: album.id };
            ModalManager.open(<AddCaption onRequestClose={() => true}
                imageUrl={image_url}
                photo={photo}
                style={STYLE}
                createPhoto={that.createPhoto.bind(that)}/>);
          }
        } else {
          // console.log("Upload failed in upload_photos_button.jsx");
          // console.log(error);
        }
      }
    );
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

        <UploadPhotosButton album={this.props.curr_album} upload={this.upload.bind(this)}/>

        <ul className="photos-list">
          {this.props.photos.map( photo => {
            return (
              <li className="image-element-class"
                  key={photo.id}
                  photo={photo}
                  imageUrl={photo.image_url}
                  caption={photo.caption}
                  onClick={this.openPhotoModal.bind(photo)}>
                <img src={photo.image_url.replace("upload", "upload/c_scale,h_250")} />
              </li>
           );
        })}
      </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const curr_album = state.photos.curr_album ? state.photos.curr_album[0] : {};
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
