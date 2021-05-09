import React, { useContext } from "react"
import { LayoutContext } from "~/context/LayoutContext"
import { Panel, panelWidth } from "~/layout/Panel"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography"
import { BackupResults } from "./BackupResults"
import { SettingsItem } from "./SettingsItem"
import { LocalBackup, LocalRestore } from "./Local"
import { BackupContext } from "~/context"
import { Bookmarklet } from "../common/Bookmarklet"
import { ViewSettings } from "./ViewSettings"
import { Routes } from "~/model/Routes"
import { Gist } from "./Gist"
import { Advanced } from "./Advanced"

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
  const backupContext = useContext(BackupContext)

  const classes = useStyles()

  const isAppRoute = route === "app"

  return (
    <Panel
      title="Settings"
      open={layoutContext.settingsPanelOpen}
      onClose={layoutContext.closeSettingsPanel}
      loading={backupContext.isLoading}
    >
      <div className={classes.root}>
        {/* Backup Results */}
        {isAppRoute && backupContext.backupCreated && backupContext.gistId && (
          <BackupResults
            gistId={backupContext.gistId}
            onDeleteClick={backupContext.deleteBackup}
            onSyncClick={backupContext.updateBackup}
            htmlUrl={backupContext.remoteUrl}
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
            <Gist />
          </SettingsItem>
        )}

        {isAppRoute && (
          <SettingsItem title="Advanced Settings">
            {/* <Gist /> */}
            <Advanced />
          </SettingsItem>
        )}

        {isAppRoute && (
          <div className={classes.bookmarkletContainer}>
            <Typography variant="h6">Quick Add Bookmarklet</Typography>
            <Typography>Drag the link to your bookmarks bar.</Typography>
            <Bookmarklet />
          </div>
        )}
      </div>
    </Panel>
  )
}
