import React, { ReactNode, useContext, useState } from "react"

import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Typography from "@material-ui/core/Typography"
import { LayoutContext } from "~/newUI/context/LayoutContext"
import { Panel, panelWidth } from "~/newUI/layout/Panel"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import { TextField } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import SyncIcon from "@material-ui/icons/Sync"
import GithubIcon from "@material-ui/icons/GitHub"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"
import AssignmentIcon from "@material-ui/icons/Assignment"

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
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  itemInput: {
    margin: theme.spacing(1),
  },
  cardRoot: {
    margin: theme.spacing(2),
  },
  backupResultInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  backupResultInput: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
}))

interface SettingsItemProps {
  title: string
  children: ReactNode
}

interface BackupResultsProps {
  gistId: string
  onGithubClick: () => void
  onSyncClick: () => void
  onDeleteClick: () => void
}

export const BackupResults: React.FC<BackupResultsProps> = ({
  gistId,
  onGithubClick,
  onSyncClick,
  onDeleteClick,
}) => {
  const classes = useStyles()

  const [hasCopied, setHasCopied] = useState(false)

  const url = `https://gistmarks.io/v/${gistId}`

  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        <Typography variant="h6">Backup Created</Typography>
        <div className={classes.backupResultInputContainer}>
          <TextField
            className={classes.backupResultInput}
            variant="outlined"
            label="Share URL"
            value={url}
          />
          <IconButton onClick={() => setHasCopied(true)}>
            {hasCopied ? <AssignmentTurnedInIcon /> : <AssignmentIcon />}
          </IconButton>
        </div>
      </CardContent>
      <CardActions>
        {/* View on Github */}
        <IconButton color="primary" onClick={onGithubClick}>
          <GithubIcon />
        </IconButton>

        {/* Sync */}
        <IconButton color="primary" onClick={onSyncClick}>
          <SyncIcon />
        </IconButton>

        {/* Delete */}
        <IconButton color="secondary" onClick={onDeleteClick}>
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  children,
}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
)

const LocalBackup = () => {
  return (
    <Button color="primary" variant="contained">
      Save to JSON File
    </Button>
  )
}

const LocalRestore = () => {
  const classes = useStyles()
  return (
    <div className={classes.itemContent}>
      <p>
        Note: if you have unsaved bookmarks, they will be overwritten when
        restoring from a JSON file
      </p>
      <input type="file" onChange={() => null} />
    </div>
  )
}

const GistBackup = () => {
  const classes = useStyles()

  const [editGist, setEditGist] = useState<boolean>(false)

  return (
    <div className={classes.itemContent}>
      <FormControlLabel
        control={
          <Switch value={editGist} onChange={() => setEditGist(!editGist)} />
        }
        label={editGist ? "Update Existing Gist" : "Create New Gist"}
      />
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Filename"
      />
      {editGist && (
        <TextField
          className={classes.itemInput}
          variant="outlined"
          label="Gist ID (optional)"
        />
      )}
      <TextField
        className={classes.itemInput}
        variant="outlined"
        label="Description (optional)"
        rows={4}
        multiline
      />
      <div>
        <Button variant="contained" color="primary">
          {editGist ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  )
}

export const GistRestore = () => {
  const classes = useStyles()

  return (
    <div className={classes.itemContent}>
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Filename"
      />
      <TextField
        required
        className={classes.itemInput}
        variant="outlined"
        label="Gist ID"
      />

      <div>
        <Button variant="contained" color="primary">
          Restore
        </Button>
      </div>
    </div>
  )
}

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
