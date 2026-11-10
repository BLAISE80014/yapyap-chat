import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LoginComponent from './Login/login';
import SignupComponent from './Signup/signup';
import DashboardComponent from './Dashboard/dashboard';
import LandingPage from './Landing/landing';
import ForgotPasswordComponent from './Login/forgotPassword';
import firebase, { isFirebaseConfigured } from './firebase';

class AuthenticatedRoute extends React.Component {
  state = { checkingAuth: true, user: null, error: null };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(
      user => this.setState({ user, checkingAuth: false, error: null }),
      error => this.setState({ error, checkingAuth: false })
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { component: Component, ...routeProps } = this.props;

    return (
      <Route
        {...routeProps}
        render={props => {
          if (this.state.checkingAuth) {
            return <main role='status'>Checking your sign-in...</main>;
          }

          if (this.state.error) {
            return <main role='alert'>Firebase {this.state.error.code || 'auth/unknown'}: {this.state.error.message || 'Could not verify sign-in state.'}</main>;
          }

          if (!this.state.user) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
          }

          return <Component {...props} user={this.state.user} />;
        }}
      />
    );
  }
}

if (isFirebaseConfigured) {
  const routing = (
    <Router>
      <div id='routing-container'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LoginComponent}></Route>
          <Route path='/signup' component={SignupComponent}></Route>
          <Route path='/forgot-password' component={ForgotPasswordComponent}></Route>
          <AuthenticatedRoute path='/dashboard' component={DashboardComponent}></AuthenticatedRoute>
        </Switch>
      </div>
    </Router>
  );

  ReactDOM.render(routing, document.getElementById('root'));
} else {
  ReactDOM.render(
    <main style={{ fontFamily: 'sans-serif', margin: '3rem auto', maxWidth: '40rem', padding: '0 1rem' }}>
      <h1>Firebase setup required</h1>
      <p>
        Add your Firebase web app configuration to a <code>.env</code> file in the project root.
        See README.md for setup instructions, then restart the development server.
      </p>
    </main>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
