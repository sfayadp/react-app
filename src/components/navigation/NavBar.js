import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "../../theme/useStyles";
import { useHistory } from "react-router-dom";
import auth from "../security/Auth";

export default function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cerrarSesion = (e) => {
    auth.logout(() => {
      // localStorage.setItem("loggedIn", false);
      // //localStorage.clear();
      handleDrawerClose();
      history.push("/");
    });
    // localStorage.setItem("loggedIn", false);
    // //localStorage.clear();
    // handleDrawerClose();
    // history.push('/');
    //this.props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu principal
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {<Icon>menu</Icon>}
          </IconButton>
        </div>
        <Divider />
        <List className={!auth.isAuthenticaded() ? classes.invisible : ""}>
          {/* <ListItem button>
            <Link
              to="/EOPLimitHistory"
              color="inherit"
              underline="none"
              className={classes.linkAppBarDesktop}
            >
              <ListItemIcon>
                <Icon>list</Icon>
              </ListItemIcon>
              <ListItemText primary="EOP Limit History" />
            </Link>
          </ListItem> */}
          <ListItem button>
            <Link
              to="/ThreadProgramCatalog"
              color="inherit"
              underline="none"
              className={classes.linkAppBarDesktop}
            >
              <ListItemIcon>
                <Icon>list</Icon>
              </ListItemIcon>
              <ListItemText primary="Thread Program Catalog" />
            </Link>
          </ListItem>
          <ListItem button>
            <Link
              to="/ThreadFamilyCatalog"
              color="inherit"
              underline="none"
              className={classes.linkAppBarDesktop}
            >
              <ListItemIcon>
                <Icon>list</Icon>
              </ListItemIcon>
              <ListItemText primary="Thread Family Catalog" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem button onClick={cerrarSesion}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="Cerrar sesion" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
