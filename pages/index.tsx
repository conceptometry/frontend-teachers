import Head from 'next/head';
import Link from 'next/link';
import Sidebar from '../src/components/Sidebar';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Sidebar>
				<Link href='/hello'>Hello</Link>
			</Sidebar>
		</div>
	);
}
