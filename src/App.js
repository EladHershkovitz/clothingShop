import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { Switch, Route, Redirect } from "react-router-dom";
import Shop from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-signup/sign-in-and-signup.component";
import { auth, createUserProfileDocument, addCollectionAndDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrenUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { selectCollectionForPreview } from "./redux/shop/shop.selector";

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrenUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
