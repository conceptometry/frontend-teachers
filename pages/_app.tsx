import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css'; //styles of nprogress
import 'bootstrap/dist/css/bootstrap.css';
import Error from 'next/error';
import { useEffect } from 'react';
import { StateProvider } from '../src/context/StateProvider';
import reducer, { initialState } from '../src/context/reducer';
import { useCookies, CookiesProvider } from 'react-cookie';

//Binding events.
NProgress.configure({
  showSpinner: false,
  speed: 150,
  trickleRate: 0.02,
  trickleSpeed: 500,
  easing: 'ease',
});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface Props {
  Component: any;
  pageProps: any;
  router: any;
}

function MyApp({ Component, pageProps, router }: Props) {
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    const get = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URI}/users/me`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${cookies.token}`,
        },
      };
      try {
        const res = await fetch(url, options);

        const resJson = await res.json();
        if (resJson.success === true) {
          localStorage.setItem('user', JSON.stringify(resJson.message));
        } else {
          console.log(resJson.message);
          return <Error statusCode={res.status} title={resJson.message} />;
        }
      } catch (e) {
        console.log(e);
        return <Error statusCode={500} title={'Internal server error'} />;
      }
    };
    if (cookies.token) {
      get();
    }
  }, []);

  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }
  return (
    <CookiesProvider>
      <StateProvider reducer={reducer} initialState={initialState}>
        <Component {...pageProps} />
      </StateProvider>
    </CookiesProvider>
  );
}

export default MyApp;
