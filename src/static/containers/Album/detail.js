import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';
import * as actionCreators from '../../actions/photo';

class AlbumDetailView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        photos: React.PropTypes.array
    };

    componentWillMount() {
        console.log("containers/AlbumDetail/index.js componentWillMount - about to dataFetchPhotos");
        // {% url 'albums:detail' album.id %}
        // debugger;
        console.log(this.props);
        const token = this.props.token;
        this.props.actions.dataFetchPhotos(token, this.props.params.id);
    }


    render() {
        return (
            <div className="container">
                <h3>AlbumDetailView</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      statusText: state.auth.statusText,
      photos: state.photos.photos
  };
};

const mapDispatchToProps = (dispatch) => {
    console.log("containers/AlbumDetail/index.js mapDispatchToProps");
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailView);
