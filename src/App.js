import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CreateOffer from './components/CreateOffer';
import Signup from './components/Signup';
import UpdateOffer from './components/UpdateOffer';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/dashboard" component={Dashboard} exact/>
             <Route path="/createoffer" component ={CreateOffer} exact />
             <Route path="/signup" component={Signup} exact />
             <Route path="/updateoffer" component={UpdateOffer} exact />
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;