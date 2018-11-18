// NOT USEING ANYMORE
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import UpdateMe from './components/UpdateMe';
import MatchPage from './components/MatchPage';
import OptionsPage from './components/OptionsPage';
import MainPage from './components/MainPage';


const RouterComponent = ({ pressStatus }) => {
  return (
    <Router>
      <Scene key="root">
        <Scene hideNavBar={true} key="MainPage" component={MainPage} title="MAIsN" initial={true} />
        <Scene hideNavBar={true} key="MatchPage" component={MatchPage} title="Tahmin-io" />
        <Scene key="OptionsPage" component={OptionsPage} title="Options" />
        <Scene key="LoginForm" component={LoginForm} title="Profile" />
        <Scene key="UpdateMe" component={UpdateMe} title="Update" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;