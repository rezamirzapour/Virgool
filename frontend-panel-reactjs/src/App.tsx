import { Dashboard, Auth } from "layouts";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// providers
import { RTLProvider } from "providers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from 'react-redux';

import JalaliUtils from "@date-io/jalaali";
import store from './store'
import { ToastContainer } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import "./App.css";
import "./assets/fonts/IRANSans/css/fontiran.css";
import "./assets/css/styles.css";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RTLProvider>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <ToastContainer />
            <Router>
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/auth" component={Auth} />
                <Redirect to="/dashboard" />
              </Switch>
            </Router>
          </MuiPickersUtilsProvider>
        </RTLProvider>
      </Provider>
    </div>
  );
}

export default App;
