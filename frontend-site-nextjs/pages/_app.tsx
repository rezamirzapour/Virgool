import { AppProps } from "next/app";
import { Router } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import NProgress from "nprogress";
import { ReactQueryDevtools } from "react-query/devtools";
// import store from "store";
import "assets/css/style.scss";
import "tailwindcss/tailwind.css";
import "material-react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

const queryClient = new QueryClient();

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 1200,
  showSpinner: false,
});
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
