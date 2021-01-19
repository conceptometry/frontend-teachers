import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css'; //styles of nprogress
import 'bootstrap/dist/css/bootstrap.css';
import Error from 'next/error';

//Binding events.
NProgress.configure({ showSpinner: false, speed: 200 });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface Props {
	Component: any;
	pageProps: any;
}

function MyApp({ Component, pageProps }: Props) {
	if (pageProps.error) {
		return (
			<Error
				statusCode={pageProps.error.statusCode}
				title={pageProps.error.message}
			/>
		);
	}
	return <Component {...pageProps} />;
}

export default MyApp;
