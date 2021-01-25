import Sidebar from '../../src/components/Sidebar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import LecturesList from '../../src/components/lists/LecturesList';
import { List } from '@material-ui/core';

export const getServerSideProps = async ({ query }) => {
	const page = query.page;
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2NiZTVlZTliZTRiMWNiNDk0ZWU2MyIsImlhdCI6MTYxMTAzMDg3NCwiZXhwIjoxNjEzNjIyODc0fQ.cWJgfAc6aYFOB5_W1DOSPvvXVmdcXzNe8aFEz91aPU0';
	const url = `${process.env.API_URI}/lectures?page=${page || 1}&limit=6`;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};

	const res = await fetch(url, options);

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

const Lectures = ({ data }) => {
	const router = useRouter();
	const { page } = router.query;
	let weekday = [];
	weekday[0] = 'Monday';
	weekday[1] = 'Tuesday';
	weekday[2] = 'Wednesday';
	weekday[3] = 'Thursday';
	weekday[4] = 'Friday';
	weekday[5] = 'Saturday';
	weekday[6] = 'Sunday';
	return (
		<>
			<Head>
				<title>Conceptometry | Lectures</title>
			</Head>
			<Sidebar>
				{data.success === true ? (
					<>
						<h2 className='text-center my-2'>Lectures</h2>
						<List>
							{data.message.map((a) => (
								<LecturesList
									key={a._id}
									id={a.id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
						<div className='d-flex mx-1'>
							{+page > 1 && (
								<Link href={`/lectures?page=${(+page || 1) - 1}`}>
									<a
										className='btn btn-light border border-1 border-primary bg-gradient mx-1'
										style={{ width: '100%' }}
									>
										Previous Page
									</a>
								</Link>
							)}
							{data.pages > (page || 1) && (
								<Link href={`/lectures?page=${(+page || 1) + 1}`}>
									<a
										className='btn btn-light border border-1 border-primary bg-gradient mx-1'
										style={{ width: '100%' }}
									>
										Next Page
									</a>
								</Link>
							)}
						</div>
						<div className='d-flex mx-1 mt-1'>
							<button
								type='button'
								className='btn btn-light bg-gradient border border-primary mx-1 w-100 shadow-sm'
							>
								Total Pages{' '}
								<span
									className='badge bg-secondary'
									style={{ fontWeight: 500 }}
								>
									{data.pages || 0}
								</span>
							</button>
							<button
								type='button'
								className='btn btn-light bg-gradient border border-primary mx-1 w-100 shadow-sm'
							>
								Current Page{' '}
								<span
									className='badge bg-secondary'
									style={{ fontWeight: 500 }}
								>
									{page || 1}
								</span>
							</button>
						</div>
					</>
				) : (
					<p className='m-3'>{data.message}</p>
				)}
			</Sidebar>
		</>
	);
};

export default Lectures;
