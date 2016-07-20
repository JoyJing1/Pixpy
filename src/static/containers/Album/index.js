import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';
import * as actionCreators from '../../actions/album';

class AlbumView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        albums: React.PropTypes.array
    };

    // let FetchAlbums = ({ dispatch }) => {
    //   l
    // }
    componentWillMount() {
        // const token = this.props.token;
        // this.props.actions.dataFetchProtectedData(token);
        // debugger;
        // this.props.route.path === "albums"
        // debugger;
        console.log("containers/Album/index.js componentWillMount - about to dataFetchAlbums");
        // console.log(dataFetchAlbums());
        // debugger;
        // dataFetchAlbums();
        const token = this.props.token;
        console.log("token", this.props.token);
        // debugger;
        this.props.actions.dataFetchAlbums(token);
    }

    // const mapDispatchToProps = (dispatch) => {
    //   return {
    //     onAlbumClick: (id) => {
    //       dispatch(selectAlbum(id))
    //     }
    //   }
    // }

    // Pull all albums
    // Display all album titles

    // {this.props.albums[0]}

    render() {
        return (
            <div className="container">
                <h3>This is my containers/AlbumView</h3>
                {this.props.albums.map(album => {
                    return album.title;
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps in Album/index.js");
  console.log(state);
  // debugger;
  return {
      statusText: state.auth.statusText,
      albums: state.albums.albums
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("containers/Album/index.js mapDispatchToProps");
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
// export { AlbumView as AlbumViewNotConnected };
// export default Album


// export default connect(mapStateToProps)(AlbumView);
// export { AlbumView as AlbumViewNotConnected };
