import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './reducers';
import Router from './components/Router';
import { onUserRead } from './actions';
import setAuthToken from './utils/setAuthToken';

setAuthToken();

const App = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    store.dispatch(onUserRead());
  }, []);

  const updateWindowDimensions = () => setWindowHeight(window.innerHeight);

  return (
    <div className="App" style={{ height: windowHeight }}>
      <Provider store={store}>
        <Router windowHeight={windowHeight} />
      </Provider>
    </div>
  );
}

export default App;
