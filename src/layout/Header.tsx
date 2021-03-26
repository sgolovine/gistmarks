import React, { useContext } from "react"

import { fade } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import CreateIcon from "@material-ui/icons/Create"
import SearchIcon from "@material-ui/icons/Search"
import SettingsIcon from "@material-ui/icons/Settings"
import makeStyles from "@material-ui/core/styles/makeStyles"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import { LayoutContext } from "~/context/LayoutContext"
import { BackupContext, BookmarkContext, GlobalStateContext } from "~/context"
import SaveIcon from "@material-ui/icons/Save"

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

interface Props {
  noSidebar?: boolean
  noSettings?: boolean
  noEditor?: boolean
  noSearch?: boolean
}

const Header: React.FC<Props> = ({
  noSidebar = false,
  noSettings = false,
  noEditor = false,
  noSearch = false,
}) => {
  const classes = useStyles()
  const backupContext = useContext(BackupContext)
  const globalStateContext = useContext(GlobalStateContext)
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        {/* Sidebar Button */}
        {!noSidebar && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={layoutContext.openSidebar}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Header Text */}
        <Typography className={classes.title} variant="h6">
          Gistmarks
        </Typography>

        {/* Search Bar */}
        {!noSearch && (
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
              value={bookmarkContext.searchTerm}
              onChange={(e) => bookmarkContext.setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Settings Button */}
        {!noSettings && (
          <IconButton color="inherit" onClick={layoutContext.openSettingsPanel}>
            <SettingsIcon />
          </IconButton>
        )}

        {/* Create Bookmark Button */}
        {!noEditor && (
          <IconButton color="inherit" onClick={layoutContext.openCreatePanel}>
            <CreateIcon />
          </IconButton>
        )}

        {!noEditor &&
          globalStateContext.unsavedChanges &&
          backupContext.backupResults.backupCreated && (
            <IconButton
              color="inherit"
              onClick={backupContext.actions.updateBackup}
            >
              <SaveIcon />
            </IconButton>
          )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
