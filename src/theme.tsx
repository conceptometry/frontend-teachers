import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

let drawerWidth: number = 240;

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0D6EFD',
		},
		secondary: {
			main: '#6e00ff',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fafafa',
		},
	},
});

export const useDrawerStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				maxWidth: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
				display: 'none',
			},
			backgroundColor: '#6E00FF !important',
		},

		appBarTitle: {
			fontWeight: 900,
		},

		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none !important',
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
			background:
				'linear-gradient(to bottom left, #f8f1e2, #fdf4e1) !important',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(0),
		},
	})
);

export default theme;
