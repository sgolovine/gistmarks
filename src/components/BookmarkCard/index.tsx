import React, { useContext } from "react"

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Chip from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography"
import EditIcon from "@material-ui/icons/Edit"
import TrashIcon from "@material-ui/icons/Delete"

import { Bookmark } from "~/model/Bookmark"
import { SettingsContext } from "~/context"

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
    fontSize: "1.25rem",
    fontWeight: 500,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    textDecoration: "none",
    color: theme.palette.text.primary,
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.secondary,
    },
  },
  hrefText: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    color: theme.palette.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "box",
    lineClamp: 1,
    boxOrient: "vertical",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    "&:visited": {
      color: theme.palette.text.secondary,
    },
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

type Props = Pick<
  Bookmark,
  "guid" | "name" | "href" | "category" | "description"
> & {
  readonly?: boolean
  onEdit?: (bookmarkGuid: string) => void
  onDelete?: (bookmarkGuid: string) => void
}

export const BookmarkCard: React.FC<Props> = ({
  guid,
  name,
  href,
  category,
  description,
  readonly,
  onEdit,
  onDelete,
}) => {
  const settingsContext = useContext(SettingsContext)
  const classes = useStyles()

  const handleEdit = () => {
    if (readonly || !onEdit) {
      return
    } else {
      onEdit(guid)
    }
  }

  const handleDelete = () => {
    if (readonly || !onDelete) {
      return
    } else {
      onDelete(guid)
    }
  }

  const renderLink = (linkName: string, className: string) => {
    return (
      <a
        target={settingsContext.openInNewTab ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={className}
        href={href}
      >
        {linkName}
      </a>
    )
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <div>{renderLink(name, classes.titleText)}</div>
        {renderLink(href, classes.hrefText)}
        <Typography className={classes.descriptionText} variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {!readonly && (
          <>
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleDelete}>
              <TrashIcon />
            </IconButton>
          </>
        )}
        {category && (
          <Chip
            color="default"
            className={classes.categoryChip}
            label={category}
          />
        )}
      </CardActions>
    </Card>
  )
}
