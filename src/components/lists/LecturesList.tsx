import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { Class, NavigateNextRounded } from '@material-ui/icons';
import styles from '../Home/InfoTabs.module.css';

interface Props {
	id: string;
	name: string;
	style: boolean;
	date: any;
}

const LecturesList = ({ id, name, style, date }: Props) => {
	let formattedDate;
	let ISODate = new Date(date);
	if (date) {
		formattedDate =
			ISODate.getDate() +
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
						<Class />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={name} secondary={`Date - ${formattedDate}`} />
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

export default LecturesList;
