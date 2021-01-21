import { useRouter } from 'next/router';
import Link from 'next/link';
import Sidebar from '../../src/components/Sidebar';
import Head from 'next/head';
import InfoBlock from '../../src/components/blocks/InfoBlock';
import { Button } from '@material-ui/core';

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
	let router = useRouter();
	const { id } = router.query;
	const dueDate = new Date(data.message.dueDate);
	const formattedDate =
		dueDate.getDate() +
		'/' +
		(dueDate.getMonth() + 1) +
		'/' +
		dueDate.getFullYear();
	const createdAt = new Date(data.message.createdAt);
	const formattedCreatedAt =
		createdAt.getDate() +
		'/' +
		(createdAt.getMonth() + 1) +
		'/' +
		createdAt.getFullYear();
	return (
		<>
			<Head>
				<title>Conceptometry | {data.message.name}</title>
			</Head>
			<Sidebar>
				<>
					{data.success === true ? (
						<>
							<h2 className='mx-4 mt-2'>{data.message.name}</h2>
							<hr />
							<h3 className='mx-4'>Description</h3>
							<p className='mx-4 my-1 mt-1' style={{ fontSize: 16 }}>
								{data.message.description}
							</p>
							<hr />
							<h3 className='mx-4'>Students</h3>
							{data.message.student.map((s, i) => (
								<p className='mx-4 my-1 mt-1' key={i} style={{ fontSize: 16 }}>
									{`${s.name},`}
								</p>
							))}
							<hr />
							<br />
							<div className='d-flex flex-lg-row flex-column mx-3'>
								<InfoBlock name={'Due Date'} info={formattedDate} />
								<InfoBlock name={'Teacher'} info={data.message.byUser.name} />
							</div>
							<div className='d-flex flex-lg-row flex-column mx-3 mt-lg-3'>
								<div
									className='w-100 border border-primary border-2 bg-infoblock p-3 m-auto mx-2 d-flex flex-column mt-lg-0 mt-3'
									style={{ borderRadius: 12, minHeight: 190 }}
								>
									<p className='mx-auto mt-3' style={{ fontSize: 18 }}>
										{'Reference Materials'}
									</p>

									{data.message.teacherMaterials ===
									'No file has been uploaded' ? (
										<>
											<p
												className='m-auto text-center'
												style={{ fontSize: 26, fontWeight: 500 }}
											>
												No file has been uploaded yet
											</p>
										</>
									) : (
										<>
											<a
												href={data.message.teacherMaterials}
												target='_blank'
												rel='noopener noreferrer nofollow noindex'
												className='m-auto text-center'
												style={{ fontSize: 26, fontWeight: 500 }}
											>
												Click Here
											</a>
										</>
									)}
								</div>
								<InfoBlock name={'Created At'} info={formattedCreatedAt} />
							</div>
							<div className='d-flex flex-column flex-md-row mx-4 mt-3'>
								<Button
									variant='outlined'
									size='medium'
									className='mx-0 mx-md-1 w-100 outline-none bg-primary bg-gradient text-white'
								>
									Edit Assignment
								</Button>
								<Link href={`/assignments/submissions/${id}`}>
									<Button
										variant='outlined'
										size='medium'
										className='mx-0 mx-md-1 mt-2 mt-md-0 w-100 outline-none bg-primary bg-gradient text-white'
									>
										View Submissions
									</Button>
								</Link>
							</div>
							<br />
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
