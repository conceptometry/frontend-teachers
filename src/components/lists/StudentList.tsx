import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { NavigateNextRounded, PersonRounded } from '@material-ui/icons';
import Link from 'next/link';
import styles from '../Home/InfoTabs.module.css';

interface Props {
	id: string;
	name: string;
	style: boolean;
	grade: any;
}

const AssignmentList = ({ id, name, grade, style }: Props) => {
	return (
		<>
			<ListItem
				key={id}
				className={style === true && `${styles.listContainer}`}
			>
				<ListItemAvatar>
					<Avatar>
						<PersonRounded />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={name}
					secondary={`Grade - ${grade}`}
				/>
				<ListItemSecondaryAction>
					<Link href={`/students/${id}`}><IconButton
						edge='end'
						aria-label='view more'
						className={styles.outlineNone}
					>
						<NavigateNextRounded />
					</IconButton></Link>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default AssignmentList;
