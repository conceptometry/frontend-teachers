import Head from 'next/head';
import HomeButtons from '../src/components/Home/Buttons';
import HomeInfoTabs from '../src/components/Home/InfoTabs';
import Sidebar from '../src/components/Sidebar';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Sidebar>
				<div
					className='bg-lightpurple px-3 py-2 text-black text-center'
					style={{ fontSize: 16, fontWeight: 500 }}
				>
					Hi Kamaldeep, you have your next lecture on 15 Jan 2020
				</div>
				<HomeInfoTabs />
				<HomeButtons />
			</Sidebar>
		</div>
	);
}
