import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/album';

class AlbumView extends React.Component {

  static propTypes = {
    statusText: React.PropTypes.string,
    albums: React.PropTypes.array
  };

  componentWillMount() {
    // console.log("containers/Album/index.js componentWillMount - about to dataFetchAlbums");
    const token = this.props.token;
    this.props.actions.dataFetchAlbums(token);
  }

  render() {
    return (
      <div className="container">
        <h3>This is my containers/AlbumView</h3>
        <ul>
          {this.props.albums.map(album => {
            return (
              <li key={album.id}>
                <Link to={`albums/${album.id}`}>
                  {album.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statusText: state.auth.statusText,
    albums: state.albums.albums
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("containers/Album/index.js mapDispatchToProps");
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
