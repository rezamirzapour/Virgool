import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'store';
import 'assets/css/style.scss';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}