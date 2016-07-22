import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/photo';
// import { dataFetchPhotos, dataCreatePhoto } from '../../actions/photo';
// import { dataCreatePhoto } from '../../actions/photo';
import UploadPhotosButton from '../../components/upload_photos_button';
import CLOUDINARY_OPTIONS from '../../components/cloudinary_options';

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
        // dataFetchPhotos(this.props.token, this.props.params.id);
    }

    upload(e) {
        // console.log("this.props = ");
        // console.log(this.props);
        // debugger;
        e.preventDefault(e);
        // console.log(e.target.value);
        // let that = this;
        const album = this.props.curr_album;
        const dataCreatePhoto = this.props.actions.dataCreatePhoto;

        cloudinary.openUploadWidget(
            CLOUDINARY_OPTIONS,
            function(error, images) {
                if (error === null) {
                    // console.log("Upload succeeded in upload_photos_button.jsx");
                    for (let i = 0; i < images.length; i++) {
                        // debugger;
                        const photo = { image_url: images[i].secure_url, caption: "Need to prompt for caption (modal?)", album_id: album.id };
                        // prompt to add a caption
                        // LocalStorage
                        // console.log("Need to add a caption");
                        console.log(window.sessionStorage.token);
                        console.log(photo);
                        // debugger;
                        dataCreatePhoto(window.sessionStorage.token, photo); // Need to pass token
                        // that.props.postImage(images[i].url);
                    }
                } else {
                    console.log("Upload failed in upload_photos_button.jsx");
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
  let curr_album = state.photos.curr_album ? state.photos.curr_album[0] : {};
  // debugger;
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



// class CreatePhoto(GenericAPIView, CreateModelMixin):
//     print("inside CreatePhoto")
//     authentication_classes = (JSONWebTokenAuthentication,)
//     lookup_url_kwarg = "album_id"
//     # serializer_class = PhotoSerializer
//     # print(album)
//
//     # def perform_create(self, serializer):
//     #     print("perform_create in albums/views.py")
//     #     album_id = self.kwargs.get(self.lookup_url_kwarg)
//     #     album = Album.objects.filter(id=album_id)
//     #     serializer.save(upload_date=timezone.now(), album=album)
//
//     # def post(self, request, album_id):
//     #     print("post in albums/views.py")
//     #     self.create(request)
//     #     print("after self.create(request)")
//     #     serializer = PhotoSerializer(request.data)
//     #     print(serializer)
//     #     return Response({ "photo": serializer.data }, content_type="JSON")
//
//     def post(self, request, album_id):
//         print("attempting to post photo")
//         album_id = self.kwargs.get(self.lookup_url_kwarg)
//         print(album_id)
//
//         album = Album.objects.filter(id=album_id)
//         print(album)
//         print('request: ')
//         print(request)
//         data = request.data
//         print(data)
//         print(request.body)
//
//         print('JSONified version of data')
//         print(json.loads(data))
//
//         caption = data["caption"]
//         image_url = data["image_url"]
//         # album = data["album"]
//         upload_date = timezone.now()
//
//         photo = { 'caption': caption,
//                     'image_url': image_url,
//                     'album': album,
//                     'upload_date': upload_date }
//         print(photo)
//
//         photo_serializer = PhotoSerializer(data=photo)
//
//         print(photo_serializer)
//
//         if photo_serializer.is_valid():
//             photo_serializer.save()
//             # photo_serializer.create()
//             # self.create(request)
//             return Response({ "photo": photo_serializer.data }, content_type="JSON")
//             # return Response( {"photo": serializer.data }, status=status.HTTP_201_CREATED)
//         return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
