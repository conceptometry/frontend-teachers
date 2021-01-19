import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './InfoTabs.module.css';
import { useTheme } from '@material-ui/core/styles';
import AssignmentsTab from './AssignmentsTab';
import LecturesTab from './LecturesTab';
import StudentsTab from './StudentsTab';

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

export default function HomeInfoTabs({
	assignmentData,
	lectureData,
	studentData,
}) {
	const [value, setValue] = React.useState(0);
	const theme = useTheme();

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div>
			<AppBar position='static' color='default'>
				<Tabs
					value={value}
					onChange={handleChange}
					TabIndicatorProps={{
						style: {
							backgroundColor: '#0D6EFD',
						},
					}}
					textColor='inherit'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='Tabs to check leads assignments lectures students'
					className={styles.tabsRow}
				>
					<Tab style={{ outline: 'none' }} label='Leads' {...a11yProps(0)} />
					<Tab
						style={{ outline: 'none' }}
						label='Assignment'
						{...a11yProps(1)}
					/>
					<Tab style={{ outline: 'none' }} label='Lectures' {...a11yProps(2)} />
					<Tab style={{ outline: 'none' }} label='Students' {...a11yProps(3)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<p>You have no leads yet...</p>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<AssignmentsTab data={assignmentData} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<LecturesTab data={lectureData} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<StudentsTab data={studentData} />
			</TabPanel>
		</div>
	);
}
