import { createStore, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Text, View } from 'react-native';
import reducers from './reducers';
import MainPage from './components/MainPage';
import Router from './Router';

const ToggleBar = ({ pressStatus }) => {
  // TODO 
  // adjust it; make it show when click opotions bar, should be beautiful and animated 
  // Animated blabbla use it
  return (
    <View
      style={
        pressStatus
        ? styles.nonMainStyle
        : null
      }
    >
      <Text>{pressStatus ? "11111111111" : null}</Text>
      <Text>{pressStatus ? "22222222222" : null}</Text>
      <Text>{pressStatus ? "33333333333" : null}</Text>
      <Text>{pressStatus ? "44444444444" : null}</Text>
      <Text>{pressStatus ? "55555555555" : null}</Text>
    </View>
  );
};

class App extends Component {
  state = { pressStatus: false };

  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
  		<Provider store={store} pressStatus={() => this.setState({ pressStatus: !this.state.pressStatus })}>
        <Router />
      </Provider>
    );
  }
};

export default App;