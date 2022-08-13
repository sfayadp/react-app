import { createTheme, makeStyles } from "@material-ui/core";

const theme = createTheme();
const drawerWidth = 240;

const useStyles = makeStyles({
  container: {
    maxHeight: 300,
  },
  containermt: {
    marginTop: 10,
  },
  containermt_filter: {
    marginTop: 15,
  },
  card: {
    padding: 30,
  },
  avatar: {
    backgroundColor: "#090",
    width: 80,
    height: 80,
  },
  vowels: {
    backgroundColor: "#090",
    width: 25,
    height: 25,
  },
  icon: {
    fontSize: 60,
  },
  form: {
    marginTop: 20,
    marginBottom: 10,
  },
  gridmb: {
    marginBottom: 20,
  },
  gridmb_filter: {
    marginBottom: 5,
  },
  gridmb_filter_online: {
    marginBottom: -5,
  },
  link: {
    marginTop: 8,
    fontSize: "1.1rem",
    fontFamily: "Roboto",
    lineHeight: 1.5,
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  grow: {
    flexGrow: 0,
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
    },
  },
  linkAppBarLogo: {
    display: "inline-flex",
    alignItems: "center",
    color: "inherit",
    textDecoration: "none",
  },
  mr: {
    marginRight: 3,
  },
  buttonIcon: {
    "&.active": {
      background: "red",
    },
    fontSize: 14,
    padding: 0,
  },
  linkAppBarDesktop: {
    display: "inline-flex",
    alignItems: "center",
    color: "inherit",
    textDecoration: "none",
  },
  list: {
    width: 250,
  },
  listItem: {
    padding: 0,
  },
  linkAppBarMobile: {
    display: "inline-flex",
    alignItems: "center",
    width: "100%",
    padding: "8px 16px",
    color: "inherit",
    textDecoration: "none",
  },
  listItemIcon: {
    minWidth: 35,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  table: {
    minWidth: 600,
  },
  text_title: {
    fontWeight: 600,
    marginBottom: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  form_text: {
    marginTop: 15,
  },
  snack_bar: {
    backgroundColor: "#f2f2f2",
  },
  table_filters: {
    maxWidth: 350,
    marginTop: 35,
    marginLeft: 20,
    marginBottom: 20,
  },
  table_filters_online: {
    maxWidth: 350,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 20,
  },
  text_card: {
    fontWeight: "bold",
  },
  bg: {
    marginTop: 10,
    marginBottom: 10,
  },
  imageList: {
    maxHeight: 220,
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  progress: {
    margin: theme.spacing(2),
  },
  chip: {
    marginTop: 20,
    margin: theme.spacing(0),
  },
  buttonExport: {
    fontSize: 14,
    padding: 10,
    alignItems: "right",
  },
  selected: {
    backgroundColor: "#008000",
    borderRadius: 3,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  invisible: {
    visibility: "hidden",
  },
  iframe: {
    width: '100%',
    height: '30vw'
  },
  match_done: {
    color: 'mediumseagreen'
  },
  match_wrong: {
    color: 'orangered'
  }
});

export default useStyles;
