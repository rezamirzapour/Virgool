import { Dashboard, Auth } from "layouts";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// providers
import { RTLProvider } from "providers";
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from 'react-redux';

import JalaliUtils from "@date-io/jalaali";
import store from './store'

import "./App.css";
import "./assets/fonts/IRANSans/css/fontiran.css";
import "./assets/css/styles.css";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RTLProvider>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <SnackbarProvider maxSnack={3} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}>
              <Router>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/auth" component={Auth} />
                  <Redirect to="/dashboard" />
                </Switch>
              </Router>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </RTLProvider>
      </Provider>
    </div>
  );
}

export default App;
