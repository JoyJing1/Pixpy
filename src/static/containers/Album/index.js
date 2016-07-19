import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';
import { dataFetchAlbums } from '../../actions/data'

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
        console.log(dataFetchAlbums());
        // debugger;
        dataFetchAlbums();
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


    render() {
        return (
            <div className="container">
                <h3>This is my containers/AlbumView</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps in Album/index.js");
  console.log(state);

  return {
      statusText: state.auth.statusText,
      albums: state.albums
  };
};

const Album = connect(mapStateToProps)(AlbumView)
export default Album


// export default connect(mapStateToProps)(AlbumView);
// export { AlbumView as AlbumViewNotConnected };
