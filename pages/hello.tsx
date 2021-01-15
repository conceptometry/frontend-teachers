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
				<h1>This is the Hello Page</h1>
				<Link href='/'>Home Page</Link>
			</Sidebar>
		</div>
	);
}
