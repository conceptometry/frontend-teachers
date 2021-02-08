import React, { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import { useDrawerStyles } from "../../theme";
import { useCookies } from "react-cookie";
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
  ListItemIcon,
} from "@material-ui/core";
import { CachedRounded, KeyboardArrowDownRounded } from "@material-ui/icons";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={`${classes.toolbar} mx-auto d-flex`}>
        <img
          // height='91'
          // width='241'
          src="/images/logo.webp"
          style={{ maxWidth: "100%" }}
          alt="Conceptometry Logo"
          className="d-flex mx-auto"
        />
      </div>
      <Divider />
      <List>
        <Link href="/">
          <ListItem button key={"Home"}>
            {/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link href="/assignments">
          <ListItem button key={"Assignments"}>
            {/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
            <ListItemText primary={"Assignments"} />
          </ListItem>
        </Link>
        <Link href="/lectures">
          <ListItem button key={"Lectures"}>
            {/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
            <ListItemText primary={"Lectures"} />
          </ListItem>
        </Link>
        <Link href="/students">
          <ListItem button key={"Students"}>
            {/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
            <ListItemText primary={"Students"} />
          </ListItem>
        </Link>
        <Link href="/profile">
          <ListItem button key={"Profile"}>
            {/* <ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon> */}
            <ListItemText primary={"Profile"} />
          </ListItem>
        </Link>
        <ListItem button key={"Reload Page"} onClick={() => router.reload()}>
          <ListItemIcon>
            <CachedRounded />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);

  let user;
  let name = "Anonymus";

  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      name = parsedUser.name || "Anonymus";
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={`${classes.appBar} bg-gradient d-flex`}
      >
        <Toolbar className="d-flex justify-content-between my-auto">
          <div className="d-flex my-auto ">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              className={`${classes.appBarTitle} d-flex my-auto`}
              style={{ fontWeight: 600 }}
              noWrap
            >
              Conceptometry
            </Typography>
          </div>
          <div
            className="d-none d-md-flex flex-column"
            onMouseOver={() => setDropdownOpen(true)}
            onMouseOut={() => setDropdownOpen(false)}
          >
            <div style={{ fontSize: 16 }} className="d-none d-md-flex my-auto">
              Hello {name} <KeyboardArrowDownRounded />
            </div>
            <div
              className={`bg-light bg-gradient border border-dark border-2 rounded text-black position-absolute ${
                !dropdownOpen && `d-none`
              }`}
              style={{ marginTop: 25, transition: "0.5s ease" }}
              onMouseOver={() => setDropdownOpen(true)}
              onMouseOut={() => setDropdownOpen(false)}
            >
              <ul className="text-black-50 list-unstyled text-decoration-none py-2 mb-0">
                <hr />
                <Link href="/students/add">
                  <a>
                    <li className="text-black-50 px-2">Add Student</li>
                  </a>
                </Link>
                <hr />
                <Link href="/students">
                  <a>
                    <li className="text-black-50 px-2">View All Students</li>
                  </a>
                </Link>
                <hr />
                <li className="text-black-50 px-2">Edit Profile</li>
                <hr />
                <li className="text-black-50 px-2">View Profile</li>
                <hr />
                <a>
                  <li
                    className="text-black-50 px-2"
                    onClick={() => {
                      router.push("/login");
                      removeCookie("token", null);
                    }}
                  >
                    Sign Out
                  </li>
                </a>
                <hr />
              </ul>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={`${classes.drawer} drawer`}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            onOpen={handleDrawerToggle}
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
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
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
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
