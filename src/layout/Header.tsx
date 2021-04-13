import React, { useContext } from "react"
import { Button, fade } from "@material-ui/core"
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
import {
  AuthContext,
  BackupContext,
  BookmarkContext,
  SettingsContext,
  ViewContext,
} from "~/context"
import SaveIcon from "@material-ui/icons/Save"
import { Routes } from "~/model/Routes"
import { useHistory } from "react-router"
import { useMatomo } from "@datapunt/matomo-tracker-react"

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
  addTitle: {
    display: "block",
    flexGrow: 1,
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
  ctaButton: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}))

interface Props {
  route: Routes
}

const getTitle = (
  route: Routes,
  viewContextName?: string | null,
  backupContextName?: string | null
) => {
  switch (route) {
    case "add": {
      return "Add Bookmark"
    }
    case "app": {
      if (backupContextName) {
        return backupContextName
      } else {
        return "Gistmarks"
      }
    }
    case "view": {
      if (viewContextName) {
        return viewContextName
      } else {
        return "View Collection"
      }
    }
    default: {
      return "Gistmarks"
    }
  }
}

const Header: React.FC<Props> = ({ route }) => {
  const classes = useStyles()
  const history = useHistory()
  const { trackEvent } = useMatomo()

  const { state: backupState, actions: backupAction } = useContext(
    BackupContext
  )
  const settingsContext = useContext(SettingsContext)
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)
  const viewContext = useContext(ViewContext)
  const authContext = useContext(AuthContext)
  const backupContext = useContext(BackupContext)

  // If a user is viewing their own collection
  // Show a link to edit the collection
  // This just takes the user to the app
  const showEditCollectionButton =
    authContext.isLoggedIn &&
    backupContext.state.backupCreated &&
    backupContext.state.gistId

  const searchInputValue =
    route === "view" ? viewContext.searchTerm : bookmarkContext.searchTerm

  const headerText = getTitle(
    route,
    viewContext?.collectionName,
    backupState.gistName
  )

  const handleCreateCollection = () => {
    trackEvent({
      category: "Header",
      action: "Create Collection Pressed",
    })
    history.push("/")
  }

  const handleEditButton = () => {
    trackEvent({
      category: "Header",
      action: "Edit Collection Pressed",
    })
    history.push("/")
  }

  const handleOpenSidebar = () => {
    trackEvent({
      category: "Header",
      action: "Toggle Sidebar",
    })
    layoutContext.openSidebar()
  }

  const handleSettingsItemPress = () => {
    trackEvent({
      category: "Header",
      action: "Toggle Settings",
    })
    layoutContext.openSettingsPanel()
  }

  const handleCreateBookmark = () => {
    trackEvent({
      category: "Header",
      action: "Toggle Create",
    })
    layoutContext.openCreatePanel()
  }

  const handleSaveCollection = () => {
    trackEvent({
      category: "Header",
      action: "Saved Changes to Collection",
    })
    backupAction.updateBackup()
  }

  const handleInputChange = (newValue: string) => {
    if (route === "view") {
      viewContext.setSearch(newValue)
    } else {
      bookmarkContext.setSearch(newValue)
    }
  }

  const renderEditButton = (route: Routes) => {
    switch (route) {
      case "view":
        return showEditCollectionButton ? (
          <Button color="inherit" onClick={handleEditButton}>
            Edit Collection
          </Button>
        ) : null
      default:
        return null
    }
  }

  const renderSidebarButton = (route: Routes) => {
    switch (route) {
      case "view-root":
      case "add": {
        return null
      }
      case "app":
      case "view":
      default: {
        return (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenSidebar}
          >
            <MenuIcon />
          </IconButton>
        )
      }
    }
  }

  const renderTitle = (route: Routes) => {
    switch (route) {
      case "add": {
        return (
          <Typography className={classes.addTitle} variant="h6">
            {headerText}
          </Typography>
        )
      }
      default: {
        return (
          <Typography className={classes.title} variant="h6">
            {headerText}
          </Typography>
        )
      }
    }
  }

  const renderSearchBar = (route: Routes) => {
    switch (route) {
      case "view-root":
      case "add": {
        return null
      }
      case "app":
      case "view":
      default: {
        return (
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
              value={searchInputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        )
      }
    }
  }

  const renderSettingsButton = (route: Routes) => {
    switch (route) {
      case "view":
      case "app": {
        return (
          <IconButton color="inherit" onClick={handleSettingsItemPress}>
            <SettingsIcon />
          </IconButton>
        )
      }
      case "add":
      case "view-root":
      default: {
        return null
      }
    }
  }

  const renderCreateBookmarkButton = (route: Routes) => {
    switch (route) {
      case "app": {
        return (
          <IconButton color="inherit" onClick={handleCreateBookmark}>
            <CreateIcon />
          </IconButton>
        )
      }
      case "add":
      case "view":
      case "view-root":
      default: {
        return null
      }
    }
  }

  const renderCTA = (route: Routes) => {
    switch (route) {
      case "view": {
        if (!showEditCollectionButton) {
          return (
            <Button
              className={classes.ctaButton}
              color="inherit"
              onClick={handleCreateCollection}
            >
              CREATE YOUR OWN COLLECTION
            </Button>
          )
        } else {
          return null
        }
      }
      default: {
        return null
      }
    }
  }

  const renderSaveButton = (
    route: Routes,
    hasUnsavedChanges?: boolean,
    backupCreated?: boolean
  ) => {
    switch (route) {
      case "app": {
        if (hasUnsavedChanges && backupCreated) {
          return (
            <IconButton color="inherit" onClick={handleSaveCollection}>
              <SaveIcon />
            </IconButton>
          )
        } else {
          return null
        }
      }
      case "add":
      case "view":
      case "view-root":
      default: {
        return null
      }
    }
  }

  return (
    <AppBar
      color={settingsContext.state.isDark ? "default" : "primary"}
      className={classes.root}
      position="sticky"
    >
      <Toolbar>
        {renderSidebarButton(route)}

        {renderTitle(route)}

        {renderSearchBar(route)}

        {renderSettingsButton(route)}

        {renderCreateBookmarkButton(route)}

        {renderSaveButton(
          route,
          settingsContext.state.unsavedChanges,
          backupState.backupCreated
        )}

        {renderEditButton(route)}
        {renderCTA(route)}
        {/* <Button
          onClick={() =>
            settingsContext.actions.setIsDark(!settingsContext.state.isDark)
          }
        >
          Dark Theme
        </Button> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header
