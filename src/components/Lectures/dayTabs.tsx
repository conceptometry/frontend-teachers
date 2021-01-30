import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './dayTabs.module.css';
import { List } from '@material-ui/core';
import LecturesList from '../lists/LecturesList';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

interface Props {
	data: any;
}
export default function DayTabs({ data }: Props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	let weekday = [];
	weekday[0] = 'Sunday';
	weekday[1] = 'Monday';
	weekday[2] = 'Tuesday';
	weekday[3] = 'Wednesday';
	weekday[4] = 'Thursday';
	weekday[5] = 'Friday';
	weekday[6] = 'Saturday';

	const sundayData: any = data.message.filter((d) => d.day === 0);
	const mondayData: any = data.message.filter((d) => d.day === 1);
	const tuesdayData: any = data.message.filter((d) => d.day === 2);
	const wednesdayData: any = data.message.filter((d) => d.day === 3);
	const thursdayData: any = data.message.filter((d) => d.day === 4);
	const fridayData: any = data.message.filter((d) => d.day === 5);
	const saturdayData: any = data.message.filter((d) => d.day === 6);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static' color='default'>
				<Tabs
					className={styles.tabsRow}
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
				>
					<Tab className='outline-none' label='Monday' {...a11yProps(0)} />
					<Tab className='outline-none' label='Tuesday' {...a11yProps(1)} />
					<Tab className='outline-none' label='Wednesday' {...a11yProps(2)} />
					<Tab className='outline-none' label='Thursday' {...a11yProps(3)} />
					<Tab className='outline-none' label='Friday' {...a11yProps(4)} />
					<Tab className='outline-none' label='Saturday' {...a11yProps(5)} />
					<Tab className='outline-none' label='Sunday' {...a11yProps(6)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				{mondayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Monday</p>
					</>
				) : (
					<>
						<List>
							{mondayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
			<TabPanel value={value} index={1}>
				{tuesdayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Tuesday</p>
					</>
				) : (
					<>
						<List>
							{tuesdayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
			<TabPanel value={value} index={2}>
				{wednesdayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Wednesday</p>
					</>
				) : (
					<>
						<List>
							{wednesdayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
			<TabPanel value={value} index={3}>
				{thursdayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Thursday</p>
					</>
				) : (
					<>
						<List>
							{thursdayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
			<TabPanel value={value} index={4}>
				{fridayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Friday</p>
					</>
				) : (
					<>
						<List>
							{fridayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
			<TabPanel value={value} index={5}>
				{saturdayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Saturday</p>
					</>
				) : (
					<>
						<List>
							{saturdayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
			<TabPanel value={value} index={6}>
				{sundayData.length === 0 ? (
					<>
						<p className='m-3'>You have no lectures for Sunday</p>
					</>
				) : (
					<>
						<List>
							{sundayData.map((a) => (
								<LecturesList
									key={a._id}
									id={a._id}
									date={`${weekday[a.day]} - ${a.time}`}
									name={a.name}
									style={false}
								/>
							))}
						</List>
					</>
				)}
			</TabPanel>
		</div>
	);
}
