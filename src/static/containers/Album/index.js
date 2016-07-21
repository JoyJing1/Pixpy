import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';
import * as actionCreators from '../../actions/album';
import CreateAlbumModal from '../../components/AlbumComponents/create_album_modal';
import { ModalManager } from 'react-dynamic-modal';

class AlbumView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        albums: React.PropTypes.array
    };

    openModal(){
      ModalManager.open(<CreateAlbumModal onRequestClose={()=>true}/>)
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
                <button onClick={this.openModal}/>
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
