import { Button } from '@material-ui/core';
import Head from 'next/head';
import InfoBlock from '../../src/components/blocks/InfoBlock';
import Sidebar from '../../src/components/Sidebar';

export const getServerSideProps = async ({ query }) => {
	const id = query.id;
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2NiZTVlZTliZTRiMWNiNDk0ZWU2MyIsImlhdCI6MTYxMTAzMDg3NCwiZXhwIjoxNjEzNjIyODc0fQ.cWJgfAc6aYFOB5_W1DOSPvvXVmdcXzNe8aFEz91aPU0';
	const url = `${process.env.API_URI}/submissions/${id}`;
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

const SingleSubmission = ({ data }) => {
	console.log(data);
	const submittedOn = new Date(data.message[0].submissionDate);
	const formattedSubmittedOn =
		submittedOn.getDay() +
		'/' +
		(submittedOn.getMonth() + 1) +
		'/' +
		submittedOn.getFullYear();
	return (
		<>
			<Head>
				<title>Conceptometry | Submission</title>
			</Head>
			<Sidebar>
				<div className='d-sm-flex justify-content-between mx-3 pt-3 my-auto'>
					<h4 className='my-auto'>{data.message[0].assignment.name}</h4>

					<p className='my-auto'>
						By{' '}
						<span className='text-capitalize'>{data.message[0].user.name}</span>
					</p>
				</div>
				<hr />
				<div className='d-flex mx-3 justify-content-between my-auto'>
					<h6>{formattedSubmittedOn}</h6>
					{data.message[0].late === true && (
						<h6>
							<span className='badge rounded-pill bg-danger bg-gradient px-3 '>
								Late
							</span>
						</h6>
					)}
				</div>
				<hr />
				<div className='d-flex flex-column mx-3'>
					<h4>Comments</h4>
					<p>{data.message[0].submissionText}</p>
				</div>
				<div className='d-flex mx-3'>
					<div
						className='w-100 border border-primary border-2 bg-infoblock p-3 m-auto mx-2 d-flex flex-column mt-lg-0 mt-3'
						style={{ borderRadius: 12, minHeight: 190 }}
					>
						<p className='mx-auto mt-3' style={{ fontSize: 18 }}>
							File
						</p>
						{data.message[0].submissionMaterials === 'nofile' ? (
							<>
								<p
									className='m-auto text-center'
									style={{ fontSize: 26, fontWeight: 500 }}
								>
									No file has been uploaded
								</p>
							</>
						) : (
							<>
								<a
									href={data.message[0].submissionMaterials}
									target='_blank'
									rel='noopener noreferrer nofollow'
									className='m-auto text-center'
									style={{ fontSize: 26, fontWeight: 500 }}
								>
									Click Here
								</a>
							</>
						)}
					</div>
				</div>
				<div className='d-lg-flex mx-3 my-3'>
					<InfoBlock name={'Remarks'} info={data.message[0].remarks} />
					{data.message[0].marks && (
						<InfoBlock
							name={'Marks'}
							info={JSON.stringify(data.message[0].marks)}
						/>
					)}
				</div>
				{!data.message[0].marks && (
					<>
						<div className='d-flex mb-3 mx-4 shadow'>
							<Button
								variant='outlined'
								size='medium'
								className='outline-none w-100 d-flex mx-auto btn btn-light border border-primary border-2'
							>
								Mark Submission
							</Button>
						</div>
					</>
				)}
			</Sidebar>
		</>
	);
};

export default SingleSubmission;
