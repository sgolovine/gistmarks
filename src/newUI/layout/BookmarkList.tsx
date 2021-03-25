import { makeStyles } from "@material-ui/core"
import React from "react"
import { BookmarkCard } from "../components/BookmarkCard"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

export const BookmarkList = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default super massive epic category"
        description=""
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark this is a much much much longer descriotion. description of the bookmark this is a much much much longer descriotion. description of the bookmark this is a much much much longer descriotion "
      />
      <BookmarkCard
        name="Sample Bookmark Sample Bookmark Sample Bookmark Sample Bookmark Sample Bookmark Sample Bookmark Sample Bookmark Sample Bookmark"
        href="https://gistmarks.io?foo=bar&foo=bar&foo=bar&foo=bar&foo=bar&foo=bar&foo=bar&foo=bar&foo=bar&foo=bar&foo=bar"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
      <BookmarkCard
        name="Sample Bookmark"
        href="https://gistmarks.io"
        category="Default"
        description="This is a description of the bookmark"
      />
    </div>
  )
}
