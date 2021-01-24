import React from 'react';
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
	ListItemText,
	CssBaseline,
	AppBar,
	SwipeableDrawer,
	Typography,
} from '@material-ui/core';
import { KeyboardArrowDownRounded } from '@material-ui/icons';

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
			<div className={`${classes.toolbar} mx-auto d-flex`}>
				<img
					// height='91'
					// width='241'
					src='/images/logo.webp'
					style={{ maxWidth: '100%' }}
					alt='Conceptometry Logo'
					className='d-flex mx-auto'
				/>
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
				<Link href='/assignments'>
					<ListItem button key={'Assignments'}>
						{/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
						<ListItemText primary={'Assignments'} />
					</ListItem>
				</Link>
				<Link href='/lectures'>
					<ListItem button key={'Lectures'}>
						{/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
						<ListItemText primary={'Lectures'} />
					</ListItem>
				</Link>
				<Link href='/students'>
					<ListItem button key={'Students'}>
						{/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
						<ListItemText primary={'Students'} />
					</ListItem>
				</Link>
				<Link href='/profile'>
					<ListItem button key={'Profile'}>
						{/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
						<ListItemText primary={'Profile'} />
					</ListItem>
				</Link>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={`${classes.appBar} bg-gradient d-flex`}
			>
				<Toolbar className='d-flex justify-content-between my-auto'>
					<div className='d-flex my-auto '>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h5'
							className={`${classes.appBarTitle} d-flex my-auto`}
							style={{ fontWeight: 600 }}
							noWrap
						>
							Conceptometry
						</Typography>
					</div>
					<div style={{ fontSize: 16 }} className='d-none d-md-flex my-auto'>
						Hello Kamaldeep <KeyboardArrowDownRounded />
					</div>
				</Toolbar>
			</AppBar>
			<nav className={`${classes.drawer} drawer`}>
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
