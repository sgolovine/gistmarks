import React, { useEffect, useState } from "react"
import { BookmarkCollection } from "~/model/Bookmark"
import { BookmarkCard } from "../BookmarkCard"
import { ListEmpty } from "./ListEmpty"
import { makeStyles, Typography } from "@material-ui/core"
import { extractCategories } from "~/helpers/extractCategories"

type BookmarkList = {
  [Category: string]: BookmarkCollection
  Uncategorized: BookmarkCollection
}

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
  },
  sectionContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  sectionContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}))

interface Props {
  bookmarks?: BookmarkCollection
  view?: boolean
  onEdit?: (bookmarkGuid: string) => void
  onDelete?: (bookmarkGuid: string) => void
}

export const List: React.FC<Props> = ({
  bookmarks = {},
  view = false,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles()

  const [data, setData] = useState<BookmarkList>({
    Uncategorized: {},
  })

  useEffect(() => {
    const bookmarkKeys = Object.keys(bookmarks)
    const bookmarksAsArray = bookmarkKeys.map((key) => bookmarks[key])
    const categories = extractCategories(bookmarks)

    // Map over categories
    const bookmarksByCategory = categories.reduce((acc, currentCategory) => {
      // Take bookmarks array
      const bookmarksInCategory = bookmarksAsArray
        // Filter results by category
        .filter((bookmarkItem) => bookmarkItem.category === currentCategory)
        // Reduce back to normalized bookmark collection
        .reduce((acc, item) => {
          return {
            ...acc,
            [item.guid]: item,
          }
        }, {})

      return {
        ...acc,
        [currentCategory]: bookmarksInCategory,
      }
    }, {})

    const unCategorizedBookmarks = bookmarksAsArray
      // Filter over bookmarks without category
      .filter((bookmark) => !bookmark.category)
      // Normalize
      .reduce(
        (acc, item) => ({
          ...acc,
          [item.guid]: item,
        }),
        {}
      )

    // Consolidate into a single object.
    const allBookmarks: BookmarkList = {
      ...bookmarksByCategory,
      Uncategorized: unCategorizedBookmarks,
    }

    setData(allBookmarks)
  }, [bookmarks])

  const handleEdit = (guid: string) => !!onEdit && onEdit(guid)

  const handleDelete = (guid: string) => !!onDelete && onDelete(guid)

  const categoryKeys = Object.keys(data).sort()

  if (Object.keys(bookmarks).length === 0) {
    return (
      <div className={classes.root}>
        <ListEmpty />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {categoryKeys.map((category, index) => {
        const categoryData = data[category]
        const bookmarkKeysForCategory = Object.keys(categoryData)
        if (bookmarkKeysForCategory.length > 0) {
          return (
            <div key={index} className={classes.sectionContainer}>
              <Typography variant="h4">{category}</Typography>
              <div className={classes.sectionContent}>
                {bookmarkKeysForCategory.map((key) => {
                  const bookmarkData = categoryData[key]
                  return (
                    <BookmarkCard
                      key={key}
                      guid={key}
                      name={bookmarkData.name}
                      href={bookmarkData.href}
                      description={bookmarkData.description}
                      category={bookmarkData.category}
                      readonly={view}
                      onEdit={() => handleEdit(key)}
                      onDelete={() => handleDelete(key)}
                    />
                  )
                })}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
