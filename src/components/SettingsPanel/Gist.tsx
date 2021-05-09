import React, { useContext, useState } from "react"

import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import GitHubIcon from "@material-ui/icons/GitHub"

import { BackupContext, AuthContext } from "~/context"

const useStyles = makeStyles((theme) => ({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: theme.spacing(2),
  },
  itemInput: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    marginLeft: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}))

export const Gist = () => {
  const classes = useStyles()
  const backupContext = useContext(BackupContext)
  const { logout, login, isLoggedIn } = useContext(AuthContext)
  const [editGist, setEditGist] = useState<boolean>(false)

  const renderAuthenticatedView = () => {
    return (
      <>
        {/* Gist Backup */}
        <div className={classes.itemContent}>
          <Typography variant="h6">Backup to Gist</Typography>
          <FormControlLabel
            control={
              <Checkbox
                value={editGist}
                onChange={() => setEditGist(!editGist)}
              />
            }
            label="Update Existing Collection"
          />
          <TextField
            required
            className={classes.itemInput}
            variant="outlined"
            label="Filename"
            value={backupContext.gistFilename}
            onChange={(e) => backupContext.setFilename(e.target.value)}
          />
          <TextField
            className={classes.itemInput}
            variant="outlined"
            label="Collection Name (optional)"
            value={backupContext.gistName}
            onChange={(e) => backupContext.setName(e.target.value)}
          />
          {editGist && (
            <TextField
              required
              className={classes.itemInput}
              variant="outlined"
              label="Gist ID"
              value={backupContext.gistId}
              onChange={(e) => backupContext.setGistId(e.target.value)}
            />
          )}
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              onClick={
                editGist
                  ? backupContext.updateBackup
                  : backupContext.createBackup
              }
            >
              {editGist ? "Update" : "Create"}
            </Button>
          </div>
        </div>

        {/* Gist Restore */}
        <div className={classes.itemContent}>
          <Typography variant="h6">Restore from Gist</Typography>
          <TextField
            required
            className={classes.itemInput}
            variant="outlined"
            label="Gist ID"
            value={backupContext.gistId}
            onChange={(e) => backupContext.setGistId(e.target.value)}
          />

          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              onClick={backupContext.restoreBackup}
            >
              Restore
            </Button>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button startIcon={<GitHubIcon />} onClick={logout}>
            LOGOUT
          </Button>
        </div>
      </>
    )
  }

  const renderUnAuthenticatedView = () => {
    return (
      <div className={classes.itemContent}>
        <Button startIcon={<GitHubIcon />} onClick={login}>
          LOGIN WITH GITHUB
        </Button>
      </div>
    )
  }

  return isLoggedIn ? renderAuthenticatedView() : renderUnAuthenticatedView()
}
