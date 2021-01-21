import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../../src/components/Sidebar';

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2NiZTVlZTliZTRiMWNiNDk0ZWU2MyIsImlhdCI6MTYxMTAzMDg3NCwiZXhwIjoxNjEzNjIyODc0fQ.cWJgfAc6aYFOB5_W1DOSPvvXVmdcXzNe8aFEz91aPU0';

export const getServerSideProps = async ({ query }) => {
	const { id } = query;
	const url = `${process.env.API_URI}/submissions/${id}?select=name,user`;
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
	return { props: { getData: data } };
};

const MarkSubmission = ({ getData }) => {
	console.log(getData);
	const [response, setResponse] = useState('');
	const { register, errors, handleSubmit } = useForm();
	const router = useRouter();
	const { id } = router.query;
	const onSubmit = async (data) => {
		const url = `${process.env.API_URI}/submissions/${id}/mark`;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
				body: JSON.stringify(data),
			},
		};

		try {
			const res = await fetch(url, options);
			const json = await res.json();
			setResponse(json.message);
		} catch (e) {
			console.log(e);
			setResponse('An error occurred, 500');
		}
	};

	return (
		<>
			<Sidebar>
				{getData.success === true ? (
					<>
						<div className='d-flex flex-column flex-md-row mx-4 my-auto mt-3 justify-content-between'>
							<h3 className='my-auto'>{getData.message[0].assignment.name}</h3>
							<p className='my-auto'>By {getData.message[0].user.name}</p>
						</div>
						<hr />
					</>
				) : (
					<>
						<p> {getData.message}</p>
					</>
				)}
			</Sidebar>
		</>
	);
};

export default MarkSubmission;
