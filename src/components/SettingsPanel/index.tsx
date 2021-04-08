import React, { useContext } from "react"
import { LayoutContext } from "~/context/LayoutContext"
import { Panel, panelWidth } from "~/layout/Panel"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { BackupResults } from "./BackupResults"
import { SettingsItem } from "./SettingsItem"
import { LocalBackup, LocalRestore } from "./Local"
import { GistBackup } from "./GistBackup"
import { GistRestore } from "./GistRestore"
import { AuthContext, BackupContext } from "~/context"
import { Button, Typography } from "@material-ui/core"
import { Bookmarklet } from "../common/Bookmarklet"
import { ViewSettings } from "./ViewSettings"
import { Routes } from "~/model/Routes"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("xs")]: {
      width: panelWidth,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
    },
  },
  bookmarkletContainer: {
    marginTop: theme.spacing(2),
  },
  logoutButtonContainer: {
    marginTop: theme.spacing(1),
  },
}))

interface Props {
  route: Routes
}

export const SettingsPanel: React.FC<Props> = ({ route }) => {
  const layoutContext = useContext(LayoutContext)
  const { state, actions } = useContext(BackupContext)
  const { isLoggedIn, login, logout } = useContext(AuthContext)

  const classes = useStyles()

  const isAppRoute = route === "app"

  return (
    <Panel
      title="Settings"
      open={layoutContext.settingsPanelOpen}
      onClose={layoutContext.closeSettingsPanel}
      loading={state.isLoading}
    >
      <div className={classes.root}>
        {/* Backup Results */}
        {isAppRoute && state.backupCreated && state.gistId && (
          <BackupResults
            gistId={state.gistId}
            onDeleteClick={actions.deleteBackup}
            onSyncClick={actions.updateBackup}
            htmlUrl={state.remoteUrl}
          />
        )}
        {/* View Settings */}
        <SettingsItem title="General">
          <ViewSettings />
        </SettingsItem>

        {/* Local Backup */}
        {isAppRoute && (
          <SettingsItem title="Local">
            <LocalBackup />
            <LocalRestore />
          </SettingsItem>
        )}

        {/* Gist Backup */}
        {isAppRoute && (
          <SettingsItem title="Github Gist">
            <GistBackup />
            <GistRestore />
          </SettingsItem>
        )}

        {isAppRoute && (
          <div className={classes.bookmarkletContainer}>
            <Typography variant="h6">Quick Add Bookmarklet</Typography>
            <Typography>Drag the link to your bookmarks bar.</Typography>
            <Bookmarklet />
          </div>
        )}
        <div className={classes.logoutButtonContainer}>
          {isLoggedIn ? (
            <Button startIcon={<GitHubIcon />} onClick={logout}>
              LOGOUT
            </Button>
          ) : (
            <Button startIcon={<GitHubIcon />} onClick={login}>
              LOGIN WITH GITHUB
            </Button>
          )}
        </div>
      </div>
    </Panel>
  )
}
