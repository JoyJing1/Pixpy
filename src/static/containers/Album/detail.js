import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';
import * as actionCreators from '../../actions/photo';

class AlbumDetailView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        photos: React.PropTypes.array,
        curr_album: React.PropTypes.object
    };

    componentWillMount() {
        // console.log("containers/AlbumDetail/index.js componentWillMount - about to dataFetchPhotos");
        const token = this.props.token;
        this.props.actions.dataFetchPhotos(token, this.props.params.id);
    }


    render() {
        return (
            <div className="container">
                <h2>{this.props.curr_album.title}</h2>
                <h3>{this.props.curr_album.description}</h3>
                <ul>
                  {this.props.photos.map( photo => {
                    return (
                      <li key={photo.id}>
                        <a>
                          <img src={photo.image_url}></img>
                          <h3>{photo.caption}</h3>
                          </a>
                      </li>
                    );
                  })}
                </ul>
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
