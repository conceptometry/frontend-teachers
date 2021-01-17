import {
	AddRounded,
	AssignmentRounded,
	ClassRounded,
	PersonAddRounded,
} from '@material-ui/icons';
import Head from 'next/head';
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
				<div className='d-flex flex-column'>
					<div className='d-md-flex mx-2 mx-md-0'>
						<button className='btn btn-light bg-gradient border border-primary mx-md-2 d-flex mt-2 w-100'>
							<div className='m-auto'>
								Create an Assignment{' '}
								<AddRounded
									style={{
										fontSize: 9,
										marginRight: '-4px',
										marginTop: '-8px',
									}}
								/>
								<AssignmentRounded style={{ fontSize: 15 }} />
							</div>
						</button>
						<button className='btn btn-light bg-gradient border border-primary d-flex mx-md-2 mt-2 w-100'>
							<div className='m-auto'>
								Create a Lecture{' '}
								<AddRounded
									style={{
										fontSize: 9,
										marginRight: '-4px',
										marginTop: '-10px',
									}}
								/>
								<ClassRounded style={{ fontSize: 15 }} />
							</div>
						</button>
					</div>
					<button className='btn btn-light border border-primary bg-gradient d-flex mx-2 mt-2'>
						<div className='m-auto'>
							Add a Student <PersonAddRounded style={{ fontSize: 15 }} />
						</div>
					</button>
				</div>
			</Sidebar>
		</div>
	);
}
