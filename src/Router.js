import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import UpdateMe from './components/UpdateMe';
import MatchPage from './components/MatchPage';
import OptionsPage from './components/OptionsPage';
import UserPage from './components/UserPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MatchDetail from './components/MatchDetail';

const RouterComponent = ({ pressStatus }) => {
  return (
    <Router>
      <Scene key="root">
        <Scene hideNavBar={true} key="MatchPage" component={MatchPage} title="Tahmin-io" initial/>
          <Scene key="MatchDetail" component={MatchDetail} title="Match Detail" />

        <Scene hideNavBar={true} key="OptionsPage" component={OptionsPage} title="Options" />

        <Scene hideNavBar={true} key="UserPage" component={UserPage} title="User" />
          <Scene key="UpdateMe" component={UpdateMe} title="Update" />
          <Scene key="SignUp" component={SignUp} title="Sign Up" />
          <Scene key="Login" component={Login} title="Login" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;