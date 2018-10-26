import { createStore, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import MainPage from './components/MainPage';

class App extends Component {
  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    )
  }
}

export default App;