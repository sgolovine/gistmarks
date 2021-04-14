import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import React, { useContext, useState } from "react"
import { AuthContext } from "~/context"

const useStyles = makeStyles((theme) => ({
  itemInput: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    marginLeft: theme.spacing(1),
  },
  itemContent: {
    display: "flex",
    flexDirection: "column",
    // width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}))

export const Advanced = () => {
  const classes = useStyles()
  const { loginWithPat, accessToken } = useContext(AuthContext)
  const [pat, setPat] = useState<string>(accessToken || "")

  return (
    <>
      <Typography variant="h6">Personal Access Token</Typography>
      <Typography>
        If you prefer to not authenticate with OAuth. You can instead use a
        personal access token for additional security
      </Typography>
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
    </>
  )
}
