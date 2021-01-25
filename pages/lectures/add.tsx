import Sidebar from '../../src/components/Sidebar';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import Select from 'react-select';
import { useEffect, useState } from 'react';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2NiZTVlZTliZTRiMWNiNDk0ZWU2MyIsImlhdCI6MTYxMTAzMDg3NCwiZXhwIjoxNjEzNjIyODc0fQ.cWJgfAc6aYFOB5_W1DOSPvvXVmdcXzNe8aFEz91aPU0';

export const getServerSideProps = async ({ query }) => {
	const url = `${process.env.API_URI}/users/student`;
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
const addLecture = ({ data }) => {
	const options = data.message.map(getOptions);

	function getOptions(item) {
		var options = { value: item._id, label: item.name };
		return options;
	}

	const [selectedValue, setSelectedValue] = useState([]);
	const [selectedSubjectsValue, setSelectedSubjectsValue] = useState([]);
	const [day, setDay] = useState('');
	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');
	const [type, setType] = useState('');
	const [hrs, setHrs] = useState('');
	const [min, setMin] = useState('');

	const subjectOptions: any = [
		{ value: 'english', label: 'English' },
		{ value: 'hindi', label: 'Hindi' },
		{ value: 'maths', label: 'Maths' },
		{ value: 'science', label: 'Science' },
		{ value: 'sst', label: 'Sst' },
	];

	const formData = {
		name,
		day,
		time: `${hrs}:${min}`,
		duration,
		type,
		subject: selectedSubjectsValue,
		student: selectedValue,
	};

	const [submitting, setSubmitting] = useState(false);
	const [response, setResponse] = useState('');
	const submitForm = async (e) => {
		e.preventDefault();
		if (selectedValue.length === 0 || selectedSubjectsValue.length === 0) {
			setResponse('Please enter a valid value for the students');
		} else {
			setSubmitting(true);
			const url = `http://localhost:5000/api/v1/lectures`;
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			};
			try {
				const res = await fetch(url, options);

				const resJson = await res.json();
				if (resJson.success === true) {
					setResponse(resJson.message);
					setSelectedValue([]);
					setName('');
					setSubmitting(false);
				} else {
					console.log(resJson.message);
					const message = `${resJson.message}`;
					setResponse(message);
					setSubmitting(false);
				}
			} catch (e) {
				console.log(e);
				const message = `An error has occured: 50X`;
				setResponse(message);
				setSubmitting(false);
			}
		}
	};

	const handleChange = (e) => {
		setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
	};
	const handleSubjectChange = (e) => {
		setSelectedSubjectsValue(Array.isArray(e) ? e.map((x) => x.value) : []);
	};

	return (
		<>
			<Head>
				<title>Conceptometry | Add Assignment</title>
			</Head>
			<Sidebar>
				<h2 className='text-center mt-2'>Add Assignment</h2>
				<>
					{data.success === true ? (
						<>
							{data.count === 0 ? (
								<>
									<p className='m-3'>
										You need to have atleast one student to make an assignment
									</p>
								</>
							) : (
								<>
									<div className='d-flex container flex-column'>
										<form
											className='mx-auto w-100 d-flex flex-column'
											onSubmit={submitForm}
										>
											<Select
												// value={options.filter((obj) =>
												// 	selectedValue.includes(obj.value)
												// )}
												options={options}
												isMulti
												onChange={handleChange}
												placeholder='Select Students'
												required
											/>
											<Select
												// value={options.filter((obj) =>
												// 	selectedValue.includes(obj.value)
												// )}
												options={subjectOptions}
												isMulti
												className='my-3'
												onChange={handleSubjectChange}
												placeholder='Select Subjects'
												required
											/>
											<div className='my-3 form-floating'>
												<input
													type='text'
													name='name'
													placeholder='Lecture Name'
													className='form-control w-100'
													value={name}
													onChange={(e) => setName(e.target.value)}
													required
												/>
												<label htmlFor='nameField'>Lecture Name</label>
											</div>
											<div className='row'>
												<div className='col-md-6'>
													<div className='form-floating'>
														<input
															type='number'
															name='duration'
															placeholder='Lecture Duration (in minutes)'
															className='form-control w-100'
															value={duration}
															onChange={(e) => setDuration(e.target.value)}
															required
														/>
														<label htmlFor='nameField'>
															Lecture Duration (in minutes)
														</label>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='form-floating'>
														<select
															className='form-select'
															id='floatingSelect'
															aria-label='Floating label select example'
															value={day}
															onChange={(e) => setDay(e.target.value)}
														>
															<option selected>Day..</option>
															<option value={0}>Monday</option>
															<option value={1}>Tuesday</option>
															<option value={2}>Wednesday</option>
															<option value={3}>Thursday</option>
															<option value={4}>Friday</option>
															<option value={5}>Saturday</option>
															<option value={6}>Sunday</option>
														</select>
														<label htmlFor='floatingSelect'>Day</label>
													</div>
												</div>
											</div>
											<div className='row my-3'>
												<div className='col-md-6'>
													<div className='form-floating'>
														<select
															className='form-select'
															id='floatingSelect'
															aria-label='Floating label select example'
															value={type}
															onChange={(e) => setType(e.target.value)}
														>
															<option selected>Type</option>
															<option value={'regular'}>Regular</option>
															<option value={'extra'}>Extra</option>
														</select>
														<label htmlFor='floatingSelect'>Lecture Type</label>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='row'>
														<div className='col-md-6'>
															<div className='form-floating'>
																<input
																	type='number'
																	name='hrs'
																	placeholder='Lecture Hours'
																	className='form-control w-100'
																	value={hrs}
																	onChange={(e) => setHrs(e.target.value)}
																	required
																/>
																<label htmlFor='field'>Lecture Hours</label>
															</div>
														</div>
														<div className='col-md-6'>
															<div className='form-floating'>
																<input
																	type='number'
																	name='hrs'
																	placeholder='Lecture Minutes'
																	className='form-control w-100'
																	value={min}
																	onChange={(e) => setMin(e.target.value)}
																	required
																/>
																<label htmlFor='field'>Lecture Minutes</label>
															</div>
														</div>
													</div>
												</div>
											</div>
											{submitting === true ? (
												<>
													<Button
														disabled={true}
														className='btn btn-light border border-primary bg-gradient btn-block outline-none'
													>
														Submitting
													</Button>
												</>
											) : (
												<>
													<Button
														type='submit'
														className='btn btn-light border border-primary bg-gradient btn-block outline-none'
													>
														Submit
													</Button>
												</>
											)}
											{response && (
												<p className='mt-1 text-center'>{response}</p>
											)}
										</form>
									</div>
								</>
							)}
						</>
					) : (
						<>
							<p>{data.message}</p>
						</>
					)}
				</>
			</Sidebar>
		</>
	);
};

export default addLecture;
