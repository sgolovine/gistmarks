import React, { useContext } from "react"
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  fade,
  InputBase,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import CreateIcon from "@material-ui/icons/Create"
import SearchIcon from "@material-ui/icons/Search"
import SettingsIcon from "@material-ui/icons/Settings"
import { LayoutContext } from "../context/LayoutContext"

const useStyles = makeStyles((theme) => ({
  iconButton: {},
  root: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

export default function Header() {
  const classes = useStyles()
  const layoutContext = useContext(LayoutContext)

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        {/* Sidebar Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => layoutContext.setSidebarState(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Header Text */}
        <Typography className={classes.title} variant="h6">
          Gistmarks
        </Typography>

        {/* Search Bar */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        {/* Settings Button */}
        <IconButton
          color="inherit"
          onClick={() => layoutContext.setPanelState(true)}
        >
          <SettingsIcon />
        </IconButton>

        {/* Create Bookmark Button */}
        <IconButton
          color="inherit"
          onClick={() => layoutContext.setPanelState(true)}
        >
          <CreateIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
