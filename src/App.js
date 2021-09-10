import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {

  const promise = loadStripe("pk_test_51JUzTnSC8ESNVgdbH178xZeRBTNg70iZfPLLzhQWrlm9PwiDKnmZYOPr7g5bDR8e4noJsnInTPJm82vhKWCFhH8Y00LKRXQhqA")

  const [{}, dispatch] = useStateValue();

  // will only run once, when the app component loads`
  useEffect(() => {

      auth.onAuthStateChanged(authUser => {

        if (authUser) {
          //the user just logged in / the user was logged in

          dispatch({
            type: "SET_USER",
            user: authUser
          })
        } else {
          // the user is logged out

          dispatch({
            type: "SET_USER",
            user: null
          })
        }
      })
  }, [])

  return (
    //BEM naming convention
    <Router>

      <div className="app">
        
        <Switch>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          
          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>

    </Router>
  );
}

export default App;
