// NOT USEING ANYMORE

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MatchPage from './components/MatchPage';
import OptionsPage from './components/OptionsPage';


const RouterComponent = ({ pressStatus }) => {
  return (
    <Router sceneStyle={{ paddingTop: 0 }}>
      <Scene key="root">
          <Scene
            initial
            key="MatchPage" 
            component={MatchPage} 
            
            onRight={() => Actions.LoginForm()}
            rightTitle="Login"

            onLeft={() => Actions.OptionsPage()}
            leftTitle="Options"
            
          />
          <Scene 
            key="OptionsPage" 
            component={OptionsPage} 
            title="OptionsPage"

            onRight={() => Actions.LoginForm()}
            rightTitle="Login"
          />
          <Scene key="LoginForm" component={LoginForm} title="LoginForm" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;