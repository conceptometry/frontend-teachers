import { Button, List } from '@material-ui/core';
import { NavigateNextRounded } from '@material-ui/icons';
import styles from './InfoTabs.module.css';
import Link from 'next/link';
import LecturesList from '../lists/LecturesList';

const LecturesTab = ({ data }) => {
	let weekday = [];
	weekday[0] = 'Sunday';
	weekday[1] = 'Monday';
	weekday[2] = 'Tuesday';
	weekday[3] = 'Wednesday';
	weekday[4] = 'Thursday';
	weekday[5] = 'Friday';
	weekday[6] = 'Saturday';
	return (
		<>
			{data.count === 0 ? (
				<>
					<p>You have made no lectures for today...</p>
				</>
			) : (
				<>
					<List dense={true} className={styles.listContainer}>
						{data.message.map((a) => (
							<LecturesList
								key={a._id}
								id={a._id}
								name={a.name}
								style={true}
								date={`${weekday[a.day]} - ${a.time}`}
							/>
						))}
					</List>

					<div className='d-flex'>
						<Link href='/lectures'>
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

export default LecturesTab;
