import { Button, List } from '@material-ui/core';
import { NavigateNextRounded } from '@material-ui/icons';
import styles from './InfoTabs.module.css';
import Link from 'next/link';
import AssignmentList from '../lists/AssignmentList';

const AssignmentsTab = ({ data }) => {
	return (
		<>
			{data.count === 0 ? (
				<>
					<p>You have made no assignments till now...</p>
				</>
			) : (
				<>
					<List dense={true} className={styles.listContainer}>
						{data.message.map((a) => (
							<AssignmentList
								key={a._id}
								id={a._id}
								name={a.name}
								dueDate={a.dueDate}
								style={true}
							/>
						))}
					</List>

					<div className='d-flex'>
						<Link href='/assignments'>
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
