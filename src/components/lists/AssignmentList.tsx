import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { Assignment, NavigateNextRounded } from '@material-ui/icons';
import styles from '../Home/InfoTabs.module.css';

interface Props {
	id: string;
	name: string;
	style: boolean;
	dueDate: any;
}

const AssignmentList = ({ id, name, style, dueDate }: Props) => {
	let formattedDate;
	let ISODate = new Date(dueDate);
	if (ISODate) {
		formattedDate =
			ISODate.getDay() +
			'/' +
			(ISODate.getMonth() + 1) +
			'/' +
			ISODate.getFullYear();
	}
	return (
		<>
			<ListItem
				key={id}
				className={style === true && `${styles.listContainer}`}
			>
				<ListItemAvatar>
					<Avatar>
						<Assignment />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={name}
					secondary={`Due Date - ${formattedDate}`}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge='end'
						aria-label='view more'
						className={styles.outlineNone}
					>
						<NavigateNextRounded />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default AssignmentList;
