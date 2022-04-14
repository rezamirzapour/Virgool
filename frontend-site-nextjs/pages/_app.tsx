import { AppProps } from "next/app";
import { Router } from "next/router";
import { useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import NProgress from "nprogress";
import { ReactQueryDevtools } from "react-query/devtools";
import { Main } from "layouts";
// import store from "store";
import "assets/css/style.scss";
import "tailwindcss/tailwind.css";
import "material-react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

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
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Main>
          <Component {...pageProps} />
        </Main>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
