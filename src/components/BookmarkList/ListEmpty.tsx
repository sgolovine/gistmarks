import { Typography } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import React from "react"
import CreateIcon from "@material-ui/icons/Create"
import { Bookmarklet } from "../common/Bookmarklet"
import { makeStyles } from "@material-ui/core"

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

export const ListEmpty = () => {
  const classes = useStyles()
  return (
    <Card className={classes.cardRoot}>
      <div className={classes.cardContent}>
        <Typography className={classes.textSpacing} variant="h6">
          You don&apos;t have any bookmarks yet
        </Typography>
        <Typography>
          Click the{" "}
          <span>
            <CreateIcon />
          </span>{" "}
          icon to create a bookmark.
        </Typography>

        <Typography className={classes.textSpacing}>
          You can also add our bookmarklet to your bookmarks bar to add
          bookmarks from anywhere
        </Typography>

        <Bookmarklet />
      </div>
    </Card>
  )
}
