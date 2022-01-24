import { useRoutes } from "react-router-dom";

// providers
import { RTLProvider } from "providers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from "react-redux";

import JalaliUtils from "@date-io/jalaali";
import { ToastContainer } from "material-react-toastify";
import store from "./store";
import routes from "routes";

import "material-react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./assets/fonts/IRANSans/css/fontiran.css";
import "./assets/css/styles.css";

function App() {
  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
      <RTLProvider>
        <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
          <ToastContainer />
          {routing}
        </MuiPickersUtilsProvider>
      </RTLProvider>
    </Provider>
  );
}

export default App;
