import {
	AddRounded,
	AssignmentRounded,
	ClassRounded,
	PersonAddRounded,
} from '@material-ui/icons';
import Link from 'next/link';

const HomeButtons = () => {
	return (
		<>
			<div className='d-flex flex-column'>
				<div className='d-md-flex mx-2 mx-md-0'>
					<Link href='/assignments/add'>
						<button className='btn btn-light bg-gradient border border-primary border-2 mx-md-2 d-flex mt-2 w-100'>
							<div className='m-auto'>
								Create an Assignment{' '}
								<AddRounded
									style={{
										fontSize: 9,
										marginRight: '-4px',
										marginTop: '-8px',
										fontWeight: 600,
									}}
								/>
								<AssignmentRounded style={{ fontSize: 15 }} />
							</div>
						</button>
					</Link>
					<Link href='/lectures/add'>
						<button className='btn btn-light bg-gradient border border-primary border-2 d-flex mx-md-2 mt-2 w-100'>
							<div className='m-auto'>
								Create a Lecture{' '}
								<AddRounded
									style={{
										fontSize: 9,
										marginRight: '-4px',
										marginTop: '-10px',
										fontWeight: 600,
									}}
								/>
								<ClassRounded style={{ fontSize: 15 }} />
							</div>
						</button>
					</Link>
				</div>
				<Link href='/students/add'>
					<button className='btn btn-light border border-primary border-2 bg-gradient d-flex mx-2 mt-2'>
						<div className='m-auto'>
							Add a Student <PersonAddRounded style={{ fontSize: 15 }} />
						</div>
					</button>
				</Link>
			</div>
		</>
	);
};

export default HomeButtons;
