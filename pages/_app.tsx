import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css'; //styles of nprogress
import 'bootstrap/dist/css/bootstrap.css';
import Error from 'next/error';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

//Binding events.
NProgress.configure({ showSpinner: false, speed: 200 });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface Props {
	Component: any;
	pageProps: any;
	router: any;
}

function MyApp({ Component, pageProps, router }: Props) {
	if (pageProps.error) {
		return (
			<Error
				statusCode={pageProps.error.statusCode}
				title={pageProps.error.message}
			/>
		);
	}
	return (
		<>
			<AnimatePresence>
				<motion.div
					key={router.route}
					initial='pageInitial'
					animate='pageAnimate'
					exit='pageExit'
					variants={{
						pageIntitial: {
							opacity: 0,
						},
						pageAnimate: {
							opacity: 1,
						},
						pageExit: {
							opacity: 0,
						},
					}}
				>
					<Component {...pageProps} />
				</motion.div>
			</AnimatePresence>
		</>
	);
}

export default MyApp;
