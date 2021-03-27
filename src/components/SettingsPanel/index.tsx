import React, { useContext } from "react"
import { LayoutContext } from "~/context/LayoutContext"
import { Panel, panelWidth } from "~/layout/Panel"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { BackupResults } from "./BackupResults"
import { SettingsItem } from "./SettingsItem"
import { LocalBackup, LocalRestore } from "./Local"
import { GistBackup } from "./GistBackup"
import { GistRestore } from "./GistRestore"
import { BackupContext } from "~/context"
import { Typography } from "@material-ui/core"
import { DEV_BOOKMARKLET, PROD_BOOKMARKLET } from "~/defines/bookmarklet"
import { dev } from "~/helpers"

const bookmarkletHref = dev ? DEV_BOOKMARKLET : PROD_BOOKMARKLET

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
  bookmarkletLinkContainer: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  bookmarkletLink: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(6),
    border: "1px dashed",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    borderColor: theme.palette.grey[400],
  },
}))

export const SettingsPanel = () => {
  const layoutContext = useContext(LayoutContext)
  const backupContext = useContext(BackupContext)

  const classes = useStyles()

  return (
    <Panel
      title="Settings"
      open={layoutContext.settingsPanelOpen}
      onClose={layoutContext.closeSettingsPanel}
      loading={backupContext.gistBackup.backupLoading}
    >
      <div className={classes.root}>
        {/* Backup Results */}
        {backupContext.backupResults.backupCreated &&
          backupContext.backupResults.gistId && (
            <BackupResults
              gistId={backupContext.backupResults.gistId}
              onDeleteClick={backupContext.actions.deleteBackup}
              onSyncClick={backupContext.actions.updateBackup}
              htmlUrl={backupContext.backupResults.htmlUrl}
            />
          )}

        {/* Local Backup */}
        <SettingsItem title="Local Backup">
          <LocalBackup />
        </SettingsItem>

        {/* Local Restore */}
        <SettingsItem title="Local Restore">
          <LocalRestore />
        </SettingsItem>

        {/* Gist Backup */}
        <SettingsItem title="Backup to Gist">
          <GistBackup />
        </SettingsItem>

        {/* Gist Restore */}
        <SettingsItem title="Restore from Gist">
          <GistRestore />
        </SettingsItem>

        <div className={classes.bookmarkletContainer}>
          <Typography variant="h6">Quick Add Bookmarklet</Typography>
          <Typography>Drag the link to your bookmarks bar.</Typography>
          <div className={classes.bookmarkletLinkContainer}>
            <a className={classes.bookmarkletLink} href={bookmarkletHref}>
              Add Bookmark
            </a>
          </div>
        </div>
      </div>
    </Panel>
  )
}
