import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { Class, NavigateNextRounded } from '@material-ui/icons';
import Link from 'next/link';
import styles from '../Home/InfoTabs.module.css';

interface Props {
	id: string;
	name: string;
	style: boolean;
	date: any;
}

const LecturesList = ({ id, name, style, date }: Props) => {
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
				<ListItemText primary={name} secondary={`${date}`} />
				<ListItemSecondaryAction>
					<Link href={`/lectures/${id}`}>
						<IconButton
							edge='end'
							aria-label='view more'
							className={styles.outlineNone}
						>
							<NavigateNextRounded />
						</IconButton>
					</Link>
				</ListItemSecondaryAction>
			</ListItem>
		</>
	);
};

export default LecturesList;
