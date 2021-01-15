import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css'; //styles of nprogress
import 'bootstrap/dist/css/bootstrap.min.css';

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
