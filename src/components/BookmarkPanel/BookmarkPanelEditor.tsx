import React, { useEffect, useState } from "react"

import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { dev } from "~/helpers"

const useStyles = makeStyles((theme) => ({
  devButton: {
    margin: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(1),
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputCategory: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  inputSelect: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

interface Props {
  editMode: boolean
  bookmarkName: string
  bookmarkHref: string
  // Value of current selected categories
  bookmarkCategory: string
  // Pass in all categories
  otherCategories: string[]
  bookmarkDescription: string

  onBookmarkNameChange: (newName: string) => void
  onBookmarkHrefChange: (newHref: string) => void
  onBookmarkCategoryChange: (newCategory: string) => void
  onBookmarkDescriptionChange: (newCategory: string) => void
  onCancel: () => void
  onSubmit: () => void
}

export const BookmarkPanelEditor: React.FC<Props> = ({
  editMode,
  bookmarkName,
  bookmarkHref,
  bookmarkCategory,
  otherCategories,
  bookmarkDescription,
  onBookmarkNameChange,
  onBookmarkHrefChange,
  onBookmarkCategoryChange,
  onBookmarkDescriptionChange,
  onCancel,
  onSubmit,
}) => {
  const [internalSelectValue, setInternalSelectValue] = useState<
    string | undefined
  >(undefined)

  useEffect(() => {
    if (internalSelectValue) {
      if (internalSelectValue === "---") {
        onBookmarkCategoryChange("")
      } else {
        onBookmarkCategoryChange(internalSelectValue)
      }
    }
  }, [internalSelectValue])

  const classes = useStyles()

  return (
    <>
      {dev && (
        <div className={classes.devButton}>
          <Button
            // onClick={onSubmit}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Autofill
          </Button>
        </div>
      )}
      <TextField
        className={classes.input}
        value={bookmarkName}
        onChange={(e) => onBookmarkNameChange(e.target.value)}
        required
        variant="outlined"
        label="Bookmark Name"
      />
      <TextField
        className={classes.input}
        value={bookmarkHref}
        onChange={(e) => onBookmarkHrefChange(e.target.value)}
        required
        variant="outlined"
        label="Bookmark URL"
      />
      <div className={classes.categoryContainer}>
        <TextField
          className={classes.inputCategory}
          value={bookmarkCategory}
          onChange={(e) => onBookmarkCategoryChange(e.target.value)}
          variant="outlined"
          label="Bookmark Category (optional)"
        />
        {otherCategories.length > 0 && (
          <Select
            variant="outlined"
            className={classes.inputSelect}
            value={internalSelectValue}
            onChange={(e) => setInternalSelectValue(e.target.value as string)}
          >
            {otherCategories.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>

      <TextField
        multiline
        rows={4}
        className={classes.input}
        variant="outlined"
        label="Description (optional)"
        value={bookmarkDescription}
        onChange={(e) => onBookmarkDescriptionChange(e.target.value)}
      />
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className={classes.button}
          color="primary"
          variant="contained"
        >
          {editMode ? "Save Bookmark" : "Create Bookmark"}
        </Button>
      </div>
    </>
  )
}
