import React, { Component } from 'react';
import FormEMSI from './page/formemsi';
import FormBPMSI from './page/formbpmsi';
import './App.css';
import Login from './page/login';
import { AuthConsumer } from './AuthContext';

import Landing from './page/landing';
import { Route, Switch, Redirect } from 'react-router';
import Sukses from './component/sukses';
import Predate from './component/predate';

import Registered from './component/registered';
// const PrivateRoute = ({ component: Component,status:isLogged,pilih:pilih, ...rest }) => (
//   <Route {...rest} render={(props) => {
//     if (pilih===undefined){

//       return  <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }} />
//     }
//    else if (pilih!=undefined&&isLogged==false){

//       return <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }} />
//     }
//     else {

//       return <Component {...props}/>
//     }


//   }} />
// )

const PrivateRoute = ({ component: Component, status: isLogged, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLogged === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />
)

// const PrivateRouteTwo = ({ component: Component, status: isLogged, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isLogged != null
//       ? <Component {...props} />
//       : <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }} />
//   )} />
// )

class App extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isLogged,isBPM }) => (
          <React.Fragment>
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute exact path="/FormEMSI" component={FormEMSI} status={isLogged} />
                <PrivateRoute exact path="/FormBPMSI" component={FormBPMSI} status={isLogged} />
                <PrivateRoute path="/pilihan" component={Landing} status={isLogged} />
                <PrivateRoute path="/success" component={Sukses} status={isLogged} />
                <PrivateRoute path="/registered" component={Registered} status={isLogged}/>
                <PrivateRoute path="/closed" component={Predate} status={isLogged}/>
              </Switch>
          </React.Fragment>
        )}

      </AuthConsumer>
    );
  }
}

export default App;
