import React, { useContext, useState } from "react"
import { Button, Checkbox, makeStyles, TextField } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { AuthContext } from "~/context"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles((theme) => ({
  itemContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  itemInput: {
    margin: theme.spacing(1),
  },
  logoutButtonContainer: {
    marginTop: theme.spacing(2),
  },
}))

export const GistBackup = () => {
  const classes = useStyles()
  const { isLoggedIn, login, logout } = useContext(AuthContext)

  const [editGist, setEditGist] = useState<boolean>(false)

  return (
    <div className={classes.itemContent}>
      {isLoggedIn ? (
        <>
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
          <div className={classes.logoutButtonContainer}>
            <Button startIcon={<GitHubIcon />} onClick={logout}>
              LOGOUT
            </Button>
          </div>
        </>
      ) : (
        <Button startIcon={<GitHubIcon />} onClick={login}>
          LOGIN WITH GITHUB
        </Button>
      )}
    </div>
  )
}
