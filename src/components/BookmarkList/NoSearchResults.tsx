import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: "auto",
    padding: theme.spacing(4),
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
  textSpacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export const NoSearchResults = () => {
  const classes = useStyles()
  return (
    <Card className={classes.cardRoot}>
      <div className={classes.cardContent}>
        <Typography className={classes.textSpacing} variant="h6">
          No results found
        </Typography>
      </div>
    </Card>
  )
}
