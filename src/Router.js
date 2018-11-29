import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import UpdateMe from './components/UpdateMe';
import MatchPage from './components/MatchPage';
import OptionsPage from './components/OptionsPage';
import UserPage from './components/UserPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MatchDetail from './components/MatchDetail';
import WantedUser from './components/WantedUser';
import UserSearch from './components/UserSearch';
import TrophyPage from './components/TrophyPage';
import LeaderBoard from './components/LeaderBoard';


const RouterComponent = ({ pressStatus }) => {
  return (
    <Router>
      <Scene key="root">
        <Scene hideNavBar initial
          key="MatchPage" component={MatchPage} title="Tahmin-io" />
        <Scene hideNavBar 
          key="LeaderBoard" component={LeaderBoard} title="LeaderBoard" />

          <Scene key="MatchDetail" component={MatchDetail} title={"Match Detail"} onBack={() => Actions.MatchPage()}/>
        
        <Scene key="TrophyPage" component={TrophyPage} title="TrophyPage" />

        <Scene hideNavBar 
          key="OptionsPage" component={OptionsPage} title="Options" />

        <Scene hideNavBar 
          key="UserPage" component={UserPage} title="User" />
          <Scene key="UpdateMe" component={UpdateMe} title="Update" />
          <Scene key="SignUp" component={SignUp} title="Sign Up" />
          <Scene key="Login" component={Login} title="Login" />

          <Scene key="WantedUser" component={WantedUser} title="WantedUser" />
          <Scene hideNavBar
            key="UserSearch" component={UserSearch} title="UserSearch" />

      </Scene>
    </Router>
  );
};

export default RouterComponent;