import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store.js'
import { Provider } from 'react-redux'

const MuiApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

const Stateful = () => (
  <Provider store={store}>
    <MuiApp/>
  </Provider>
)

const rootEl = document.getElementById('root')
ReactDOM.render(<Stateful />, rootEl)
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Stateful />,
      rootEl
    )
  })
}

// if(navigator.getWakeLock) {
//   navigator.getWakeLock("screen").then(function(wakeLock) {
//     var request = wakeLock.createRequest();
//     setTimeout(function() {
//       request.cancel();
//     }, 1 * 60 * 60 * 1000);
//   });
// } else {
//   alert('no wakelock :(')
// }
