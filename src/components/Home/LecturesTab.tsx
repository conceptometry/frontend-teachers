import { Button, List } from '@material-ui/core';
import { NavigateNextRounded } from '@material-ui/icons';
import styles from './InfoTabs.module.css';
import Link from 'next/link';
import LecturesList from '../lists/LecturesList';

const LecturesTab = ({ data }) => {
	return (
		<>
			{data.count === 0 ? (
				<>
					<p>You have made no lectures yet...</p>
				</>
			) : (
				<>
					<List dense={true} className={styles.listContainer}>
						{data.message.map((a) => (
							<LecturesList
								key={a._id}
								id={a.id}
								name={a.name}
								style={true}
								date={a.eventTime}
							/>
						))}
					</List>

					<div className='d-flex'>
						<Link href='/lectures/page/1'>
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
