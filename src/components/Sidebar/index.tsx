import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useTheme } from '@material-ui/core/styles';
import { useDrawerStyles } from '../../theme';
import {
	Toolbar,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	AppBar,
	SwipeableDrawer,
	Typography,
} from '@material-ui/core';

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children?: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
	const { window } = props;
	const classes = useDrawerStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<h1>Hello</h1>
			</div>
			<Divider />
			<List>
				<Link href='/'>
					<ListItem button key={'Home'}>
						{/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
						<ListItemText primary={'Home'} />
					</ListItem>
				</Link>
				<Link href='/hello'>
					<ListItem button key={'Hello'}>
						{/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
						<ListItemText primary={'Hello'} />
					</ListItem>
				</Link>
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Conceptometry
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation='css'>
					<SwipeableDrawer
						onOpen={handleDrawerToggle}
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</SwipeableDrawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
		</div>
	);
}
