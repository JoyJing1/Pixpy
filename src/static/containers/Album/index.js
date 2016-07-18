import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import logoImage from './images/react-logo.png';

class AlbumView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string
    };

    // Pull all albums
    // Display all album titles


    render() {
        return (
            <div className="container">
                <h3>This is my AlbumView</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(AlbumView);
export { AlbumView as AlbumViewNotConnected };
