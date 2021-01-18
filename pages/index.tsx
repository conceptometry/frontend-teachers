import Head from 'next/head';
import HomeButtons from '../src/components/Home/Buttons';
import HomeInfoTabs from '../src/components/Home/InfoTabs';
import Sidebar from '../src/components/Sidebar';

export const getServerSideProps = async (context) => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2M4OGYyNzliMzQ3NDliOGUxZDlmNyIsImlhdCI6MTYxMDQ0MjUzOCwiZXhwIjoxNjEzMDM0NTM4fQ.4_5HC9oqAFiygzm8FC1N_K6VkbFZ_oexFIBB0fPIWZM';
	const res = await fetch(
		`http://192.168.29.75:5000/api/v1/assignments?page=1&limit=4`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		}
	);
	const json = await res.json();
	const assignmentData = json;
	return {
		props: {
			assignmentData,
		},
	};
};

export default function Home({ assignmentData }) {
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
				<HomeInfoTabs assignmentData={assignmentData} />
				<HomeButtons />
			</Sidebar>
		</div>
	);
}
