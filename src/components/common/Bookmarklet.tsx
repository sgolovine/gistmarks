import { DEV_BOOKMARKLET, PROD_BOOKMARKLET } from "~/defines/bookmarklet"
import { dev } from "~/helpers"
import makeStyles from "@material-ui/core/styles/makeStyles"

const bookmarkletHref = dev ? DEV_BOOKMARKLET : PROD_BOOKMARKLET

const useStyles = makeStyles((theme) => ({
  bookmarkletLinkContainer: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  bookmarkletLink: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(6),
    border: "1px dashed",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    borderColor: theme.palette.grey[400],
  },
}))

export const Bookmarklet = () => {
  const classes = useStyles()
  return (
    <div className={classes.bookmarkletLinkContainer}>
      <a className={classes.bookmarkletLink} href={bookmarkletHref}>
        Add Bookmark
      </a>
    </div>
  )
}
