import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import './pages/homepage/homepage.styles.scss'
import { Switch, Route, Link } from 'react-router-dom';

import Header from './components/header/header.component.jsx';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
//import { render } from 'node-sass';
import reactDom from 'react-dom';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            cuurentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }
          )
        });
      }
      this.setState({ currentUser: userAuth })
    })
  }

    componentWillUnmount() {
      this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signIn' component={SignInAndSignUpPage} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
