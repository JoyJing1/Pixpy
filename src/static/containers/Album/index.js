import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/album';
import CreateAlbumModal from '../../components/AlbumComponents/create_album_modal';
import { ModalManager } from 'react-dynamic-modal';

const STYLE = { content: { background: 'black',
                            border: "2px solid #828282",
                            maxHeight: '70%',
                            borderRadius: "10px",
                            margin: "10% auto" },
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)'}
              };

class AlbumView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        albums: React.PropTypes.array
    };

    openModal(){
      const token = this.props.token
      ModalManager.open(<CreateAlbumModal
          onRequestClose={()=>true}
          token={token}
          style={STYLE}
          createAlbum={this.props.actions.dataCreateAlbum.bind(this)}/>)
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
                <h3>Explore Pixpy, a Django/Redux photo-sharing app developed by <a href="https://github.com/joyjing1">Joy Jing</a> and <a href="https://github.com/corleyma">Matt Corley</a></h3>

                <button className="new-album-button"
                        onClick={this.openModal.bind(this)}
                        >New Album
                </button>

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
