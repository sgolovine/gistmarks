import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { BackupContext, AuthContext, SettingsContext } from "~/context"
import GitHubIcon from "@material-ui/icons/GitHub"

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
  const settingsContext = useContext(SettingsContext)
  const { state, actions } = useContext(BackupContext)
  const { logout, login, isLoggedIn } = useContext(AuthContext)
  const [editGist, setEditGist] = useState<boolean>(false)

  const { loginWithPat, accessToken } = useContext(AuthContext)
  const [pat, setPat] = useState<string>(accessToken || "")

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
            value={state.gistFilename}
            onChange={(e) => actions.setFilename(e.target.value)}
          />
          <TextField
            className={classes.itemInput}
            variant="outlined"
            label="Collection Name (optional)"
            value={state.gistName}
            onChange={(e) => actions.setName(e.target.value)}
          />
          {editGist && (
            <TextField
              required
              className={classes.itemInput}
              variant="outlined"
              label="Gist ID"
              value={state.gistId}
              onChange={(e) => actions.setGistId(e.target.value)}
            />
          )}
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              onClick={editGist ? actions.updateBackup : actions.createBackup}
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
            value={state.gistId}
            onChange={(e) => actions.setGistId(e.target.value)}
          />

          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              onClick={actions.restoreBackup}
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
    return settingsContext.state.isBackendConnected ? (
      <div className={classes.itemContent}>
        <Button startIcon={<GitHubIcon />} onClick={login}>
          LOGIN WITH GITHUB
        </Button>
      </div>
    ) : (
      <div className={classes.itemContent}>
        <TextField
          required
          className={classes.itemInput}
          variant="outlined"
          label="Personal Access Token"
          value={pat}
          onChange={(e) => setPat(e.target.value)}
        />
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => loginWithPat(pat)}
          >
            Authenticate
          </Button>
          <Button
            className={classes.button}
            color="secondary"
            variant="outlined"
            onClick={() => loginWithPat(pat)}
          >
            Clear Token
          </Button>
        </div>
      </div>
    )
  }

  return isLoggedIn ? renderAuthenticatedView() : renderUnAuthenticatedView()
}
