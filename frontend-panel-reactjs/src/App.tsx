import { useRoutes } from "react-router-dom";

// providers
import { RTLProvider } from "providers";
import { Provider } from "react-redux";

import { ToastContainer } from "material-react-toastify";
import store from "./store";
import routes from "routes";

import "material-react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./assets/fonts/IRANSans/css/fontiran.css";
import "./assets/css/styles.css";
// theme
import ThemeConfig from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function App() {
  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeConfig>
          <RTLProvider>
            <ToastContainer />
            {routing}
          </RTLProvider>
        </ThemeConfig>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
