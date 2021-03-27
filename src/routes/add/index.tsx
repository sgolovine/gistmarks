import { CardContent, makeStyles } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import React, { useContext, useEffect, useState } from "react"
import { BookmarkPanelEditor } from "~/components/BookmarkPanel/BookmarkPanelEditor"
import { BookmarkContext } from "~/context"
import Header from "~/layout/Header"
import qs from "query-string"

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px",
    },
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
  },
}))

export const AddRoute: React.FC = () => {
  const classes = useStyles()
  const bookmarkContext = useContext(BookmarkContext)

  const [bookmarkName, setBookmarkName] = useState<string>("")
  const [bookmarkHref, setBookmarkHref] = useState<string>("")
  const [bookmarkDescription, setBookmarkDescription] = useState<string>("")
  const [bookmarkCategory, setBookmarkCategory] = useState<string>("")

  useEffect(() => {
    try {
      const queryParams = qs.parse(window.location.search)
      if (queryParams && queryParams.name) {
        setBookmarkName(queryParams.name as string)
      }
      if (queryParams && queryParams.href) {
        setBookmarkHref(queryParams.href as string)
      }
    } catch {
      // silent
    }
  }, [])

  return (
    <div>
      <Header add noSidebar noSettings noEditor noSearch />
      <Card className={classes.formContainer}>
        <CardContent className={classes.innerContainer}>
          <BookmarkPanelEditor
            editMode={false}
            bookmarkName={bookmarkName}
            bookmarkHref={bookmarkHref}
            bookmarkCategory={bookmarkCategory}
            otherCategories={bookmarkContext.categories}
            bookmarkDescription={bookmarkDescription}
            onBookmarkNameChange={(newValue) => setBookmarkName(newValue)}
            onBookmarkHrefChange={(newValue) => setBookmarkHref(newValue)}
            onBookmarkDescriptionChange={(newValue) =>
              setBookmarkDescription(newValue)
            }
            onBookmarkCategoryChange={(newValue) =>
              setBookmarkCategory(newValue)
            }
            onCancel={() => null}
            onSubmit={() => null}
          />
        </CardContent>
      </Card>
    </div>
  )
}
