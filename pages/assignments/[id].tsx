import { useRouter } from 'next/router';
import Sidebar from '../../src/components/Sidebar';
import Head from 'next/head';
import InfoBlock from '../../src/components/blocks/InfoBlock';

export const getServerSideProps = async ({ query }) => {
	const id = query.id;
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2NiZTVlZTliZTRiMWNiNDk0ZWU2MyIsImlhdCI6MTYxMTAzMDg3NCwiZXhwIjoxNjEzNjIyODc0fQ.cWJgfAc6aYFOB5_W1DOSPvvXVmdcXzNe8aFEz91aPU0';
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};

	const res = await fetch(`${process.env.API_URI}/assignments/${id}`, options);
	let data;
	if (!res.ok) {
		const message = `An error has occured: ${res.status}`;
		data = {
			success: false,
			message: message,
			status: res.status,
		};
	} else {
		data = await res.json();
	}

	return { props: { data } };
};
const SingleAssignment = ({ data }) => {
	console.log(data);
	return (
		<>
			<Head>
				<title>Conceptometry | {data.message.name}</title>
			</Head>
			<Sidebar>
				<>
					{data.success === true ? (
						<>
							<h1>{data.message.name}</h1>

							<div className='d-flex flex-lg-row flex-column mx-3'>
								<InfoBlock name={'Name'} info={data.message.name} />
								<InfoBlock />
								<InfoBlock />
							</div>
						</>
					) : (
						<>
							<p className='m-3'>{data.message}</p>
						</>
					)}
				</>
			</Sidebar>
		</>
	);
};

export default SingleAssignment;
