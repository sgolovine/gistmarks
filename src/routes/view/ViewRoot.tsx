import {
  Card,
  CardContent,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Header from "~/layout/Header"

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: "auto",
    marginTop: theme.spacing(10),
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
  },
  input: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "300px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}))

export const ViewRootRoute = () => {
  const classes = useStyles()
  const [gistId, setGistId] = useState("")
  const history = useHistory()

  const handleViewCollection = () => {
    if (gistId) {
      history.push(`/view/${gistId}`)
    }
  }

  return (
    <>
      {/* App Header */}
      <Header route="view-root" />
      <Card className={classes.cardRoot}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.header} variant="h6">
            View Bookmark Collection
          </Typography>
          <TextField
            required
            className={classes.input}
            placeholder="GistID"
            label="Collection Gist ID"
            variant="outlined"
            value={gistId}
            onChange={(e) => setGistId(e.target.value)}
          />
          <Button
            className={classes.button}
            color="primary"
            variant="outlined"
            disabled={!gistId}
            onClick={handleViewCollection}
          >
            View Collection
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
