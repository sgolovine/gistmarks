import React, { useContext } from "react"
import { LayoutContext } from "~/context/LayoutContext"
import { Panel, panelWidth } from "~/layout/Panel"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { BackupResults } from "./BackupResults"
import { SettingsItem } from "./SettingsItem"
import { LocalBackup, LocalRestore } from "./Local"
import { GistBackup } from "./GistBackup"
import { GistRestore } from "./GistRestore"

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
}))

export const SettingsPanel = () => {
  const layoutContext = useContext(LayoutContext)

  const classes = useStyles()

  return (
    <Panel
      title="Settings"
      open={layoutContext.settingsPanelOpen}
      onClose={layoutContext.closeSettingsPanel}
    >
      <div className={classes.root}>
        {/* Backup Results */}
        <BackupResults
          gistId="some-gist-id"
          onDeleteClick={() => null}
          onSyncClick={() => null}
          onGithubClick={() => null}
        />

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
      </div>
    </Panel>
  )
}
