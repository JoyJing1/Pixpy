import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { authLogoutAndRedirect } from './actions/auth';
// import SideMenu from './components/SideMenu';
import { push } from 'react-router-redux';
import './styles/main.scss';

class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        children: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.sidebarWidthDesktop = 280;
        this.sidebarWidthMobile = 60;

        this.state = {
            containerWidth: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.setContainerWidth);
        this.setContainerWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setContainerWidth);
    }

    setContainerWidth = () => {
        const sidebarWidth = document.body.clientWidth > 1200 ? this.sidebarWidthDesktop : this.sidebarWidthMobile;
        this.setState({
            containerWidth: document.body.clientWidth - sidebarWidth
        });
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    toAlbumsIndex = () => {
        this.props.dispatch(push('/albums'));
    };

    render() {
        // only show the sidebar for authenticated users
        let bodyContent = null;
        if (this.props.isAuthenticated) {
            bodyContent = (
                <div className="app">
                    <div className="app__sidebar">
                    </div>
                    <div className="app__content"
                    >
                        <div className="app__content__container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        } else {
            bodyContent = (
                <div>
                    {this.props.children}
                </div>
            );
        }

        return (
            <div className="app">
                <nav className="app__navbar">
                    <Link className="app__navbar__title float-left" to="/">
                        P<span>i</span>xpy
                    </Link>
                      {this.props.isAuthenticated ?
                        <ul className="float-right">
                          <li>
                            <a className="js-albums-button"
                                onClick={this.toAlbumsIndex}>
                              Albums
                            </a>
                          </li>
                          <li>
                            <a href="#" className="js-logout-button"
                              onClick={this.logout}
                              >
                              Logout
                            </a>
                          </li>
                        </ul>
                        :
                        <ul className="float-right">
                          <li>
                            <Link className="js-login-button" to="/login">Login</Link>
                          </li>
                        </ul>
                      }
                </nav>

                {bodyContent}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
