import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles, TextField } from "@material-ui/core"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import SyncIcon from "@material-ui/icons/Sync"
import GithubIcon from "@material-ui/icons/GitHub"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"
import AssignmentIcon from "@material-ui/icons/Assignment"

interface BackupResultsProps {
  gistId: string
  htmlUrl: string | null
  onSyncClick: () => void
  onDeleteClick: () => void
}

const useStyles = makeStyles((theme) => ({
  root: {
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

export const BackupResults: React.FC<BackupResultsProps> = ({
  gistId,
  htmlUrl,
  onSyncClick,
  onDeleteClick,
}) => {
  const classes = useStyles()

  const [hasCopied, setHasCopied] = useState(false)

  const url = `https://app.gistmarks.io/v/${gistId}`

  return (
    <Card className={classes.root}>
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
        {htmlUrl && (
          <IconButton
            color="primary"
            onClick={() => window.location.assign(htmlUrl)}
          >
            <GithubIcon />
          </IconButton>
        )}

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
