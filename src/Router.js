import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MatchPage from './components/MatchPage';
import OptionsPage from './components/OptionsPage';

// TODO
// make MainPage.js a file that contains both Router and options bar
// that I want it to render a bar that slides from left to right when I click on it

const RouterComponent = ({ pressStatus }) => {
  return (
    <Router sceneStyle={{ paddingTop: 0 }}>
      <Scene key="root">
          <Scene
            onRight={() => Actions.LoginForm()}
            rightTitle="Login"

            onLeft={() => Actions.OptionsPage()}
            leftTitle="Options"
            
            key="MatchPage" 
            component={MatchPage} 
            initial
          />
          <Scene key="OptionsPage" component={OptionsPage} title="OptionsPage" />
          <Scene key="LoginForm" component={LoginForm} title="LoginForm" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;