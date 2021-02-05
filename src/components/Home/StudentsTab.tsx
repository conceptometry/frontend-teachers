import { Button, List } from '@material-ui/core';
import { NavigateNextRounded } from '@material-ui/icons';
import styles from './InfoTabs.module.css';
import Link from 'next/link';
import StudentList from '../lists/StudentList';

const AssignmentsTab = ({ data }) => {
	return (
		<>
			{data.count === 0 ? (
				<>
					<p>You have no students yet...</p>
				</>
			) : (
				<>
					<List dense={true} className={styles.listContainer}>
						{data.message.map((a) => (
							<StudentList
								key={a._id}
								id={a._id}
								name={a.name}
								grade={a.grade}
								style={true}
							/>
						))}
					</List>

					<div className='d-flex'>
						<Link href='/students'>
							<Button
								variant='outlined'
								style={{ marginLeft: 'auto', marginRight: 'auto' }}
								className={styles.muiBtnBlue}
							>
								View All <NavigateNextRounded />
							</Button>
						</Link>
					</div>
				</>
			)}
		</>
	);
};

export default AssignmentsTab;
