import { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import Burger from './containers/BurgerBuilder/BurgerBuilder'
import Checktout from './containers/Checkout/Checkout';
import { Route,Switch,Redirect,withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'
import { connect } from 'react-redux';
class App extends Component {
 
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Burger} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checktout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Burger} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }


}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
