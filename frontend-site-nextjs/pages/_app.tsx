import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from 'store';
import 'assets/css/style.scss';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SnackbarProvider>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SnackbarProvider>
    )
}