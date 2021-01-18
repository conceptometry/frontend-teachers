import {
	AddRounded,
	AssignmentRounded,
	ClassRounded,
	PersonAddRounded,
} from '@material-ui/icons';

const HomeButtons = () => {
	return (
		<>
			<div className='d-flex flex-column'>
				<div className='d-md-flex mx-2 mx-md-0'>
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
				</div>
				<button className='btn btn-light border border-primary border-2 bg-gradient d-flex mx-2 mt-2'>
					<div className='m-auto'>
						Add a Student <PersonAddRounded style={{ fontSize: 15 }} />
					</div>
				</button>
			</div>
		</>
	);
};

export default HomeButtons;
