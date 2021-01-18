import {
	Avatar,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { Assignment, NavigateNextRounded } from '@material-ui/icons';
import styles from './InfoTabs.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

const AssignmentsTab = ({ data }) => {
	return (
		<>
			<List dense={true} className={styles.listContainer}>
				{data.message.map((a) => (
					<ListItem className={styles.listContainer}>
						<ListItemAvatar>
							<Avatar>
								<Assignment />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={a.name} secondary='Due Date - 19/12/2020' />
						<ListItemSecondaryAction>
							<IconButton
								edge='end'
								aria-label='delete'
								className={styles.outlineNone}
							>
								<NavigateNextRounded />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>

			<div className='d-flex'>
				<Link href='/page'>
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
	);
};

export default AssignmentsTab;
