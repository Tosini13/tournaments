import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, useSelector } from 'react-redux'
import rootReducer from './store/reducers/RootReducer'
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'
import SplashScreen from './components/extra/SplashScreen';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(fbConfig, { attachAuthIsReady: true })
  )
);

// store.subscribe(() => {
//   console.log('store changed!');
//   console.log(store.getState());
// });

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <SplashScreen />
  return children
}

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  // <React.StrictMode>
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Provider store={store}>
      {/* <AuthIsLoaded> */}
        <App />
      {/* </AuthIsLoaded> */}
    </Provider>
  </ReactReduxFirebaseProvider>
  // </React.StrictMode>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
