import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Providers } from '@/redux/provider';
import { wrapper } from '@/redux/store';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
