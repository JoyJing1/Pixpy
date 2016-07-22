import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/album';
import CreateAlbumModal from '../../components/AlbumComponents/create_album_modal';
import { ModalManager } from 'react-dynamic-modal';

class AlbumView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        albums: React.PropTypes.array
    };

    openModal(){
      const token = this.props.token
      ModalManager.open(<CreateAlbumModal onRequestClose={()=>true} token={token} createAlbum={this.props.actions.dataCreateAlbum.bind(this)}/>)
    }

    componentWillMount() {
        // console.log("containers/Album/index.js componentWillMount - about to dataFetchAlbums");
        // {% url 'albums:detail' album.id %}
        const token = this.props.token;
        this.props.actions.dataFetchAlbums(token);
    }

    render() {
        return (
            <div className="container">
                <h2>P<span>i</span>xpy P<span>i</span>cs</h2>
                <h3>Explore all albums on Pixpy, a Django/Redux photo-sharing app</h3>
                <ul>
                  {this.props.albums.map(album => {
                      return (
                        <li key={album.id} className="album-item">
                          <Link to={`albums/${album.id}`}>
                            {album.title}
                          </Link>
                        </li>
                      );
                  })}

                </ul>
                <button className="new-album" onClick={this.openModal.bind(this)}> Open Create Album Modal </button>
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
