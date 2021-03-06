import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

import './style.scss';


class ProtectedView extends React.Component {

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.string,
        token: React.PropTypes.string.isRequired,
        actions: React.PropTypes.object.isRequired
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.dataFetchProtectedData(token);
    }

    render() {
        return (
            <div className="protected">
                <div className="container">
                    {this.props.isFetching === true ?
                        <h1>Loading data...</h1>
                        :
                        <div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <h1>Welcome back!</h1>
                                </div>
                            </div>

                            <div className="row margin-top-small">
                                <div className="small-12 columns">
                                    <div className="protected__protected-data">
                                        Data from server<br/>
                                        <b>{this.props.data}</b>
                                        <h2>THIS IS YOUR TOKEN</h2>
                                        <h2>{this.props.token}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
export { ProtectedView as ProtectedViewNotConnected };
