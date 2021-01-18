import Head from 'next/head';
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
import styles from '../src/components/Home/InfoTabs.module.css';
import Link from 'next/link';

export const getServerSideProps = async (context) => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2M4OGYyNzliMzQ3NDliOGUxZDlmNyIsImlhdCI6MTYxMDQ0MjUzOCwiZXhwIjoxNjEzMDM0NTM4fQ.4_5HC9oqAFiygzm8FC1N_K6VkbFZ_oexFIBB0fPIWZM';
	const res = await fetch(
		`http://192.168.29.75:5000/api/v1/assignments?page=1&limit=4`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		}
	);
	const json = await res.json();
	const data = json;
	return {
		props: {
			data: data,
		},
	};
};

const page = ({ data }) => {
	console.log(data);
	return (
		<>
			<Head>
				<title>Conceptometry | Page</title>
			</Head>
			<>
				<List dense={true} className={styles.listContainer}>
					{data.message.map((a) => (
						<ListItem className={styles.listContainer}>
							<ListItemAvatar>
								<Avatar>
									<Assignment />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={a.name}
								secondary='Due Date - 19/12/2020'
							/>
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
		</>
	);
};

export default page;
