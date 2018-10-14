import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import LoginForm from './components/LoginForm';
import OptionsList from './components/OptionsList';
import MatchList from './components/MatchList';
import reducers from './reducers';

class App extends Component {
  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <View>
          <LoginForm />
          <OptionsList />
          <MatchList />
        </View>
      </Provider>
    )
  }
}

export default App