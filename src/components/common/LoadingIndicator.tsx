import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
}))

export const LoadingIndicator = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  )
}
