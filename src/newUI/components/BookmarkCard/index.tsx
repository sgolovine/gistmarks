import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React from "react"
import { Bookmark } from "~/model/Bookmark"
import EditIcon from "@material-ui/icons/Edit"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 300,
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  titleText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "box",
    lineClamp: 1,
    boxOrient: "vertical",
  },
  hrefText: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "box",
    lineClamp: 1,
    boxOrient: "vertical",
  },
  descriptionText: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "box",
    lineClamp: 3,
    boxOrient: "vertical",
  },
  categoryChip: {
    maxWidth: 100,
  },
}))

export const BookmarkCard: React.FC<
  Pick<Bookmark, "name" | "href" | "category" | "description">
> = ({ name, href, category, description }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.titleText} variant="h6">
          {name}
        </Typography>
        <Typography className={classes.hrefText} variant="body2">
          {href}
        </Typography>
        {/* <Typography className={classes.categoryText} variant="body2">
          {category}
        </Typography> */}
        <Typography className={classes.descriptionText} variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="secondary">
          <DeleteForeverIcon />
        </IconButton>
        <Chip
          color="primary"
          className={classes.categoryChip}
          label={category}
        />
      </CardActions>
    </Card>
  )
}
