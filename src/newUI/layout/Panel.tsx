import React, { useContext } from "react"
import {
  Drawer,
  makeStyles,
  IconButton,
  Divider,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core"
import { LayoutContext } from "../context/LayoutContext"
import { ChevronRight } from "@material-ui/icons"

const panelWidth = 500

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: panelWidth,
  },
  input: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    // border: "1px solid",
  },
  inputCategory: {
    // border: "1px solid",
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // marginTop: theme.spacing(2),
  },
  inputSelect: {
    flexGrow: 1,
    // border: "1px solid",
    // marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // marginBottom: theme.spacing(2),
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

export default function Panel() {
  const layoutContext = useContext(LayoutContext)
  const classes = useStyles()

  return (
    <Drawer
      anchor={"right"}
      open={layoutContext.panelOpen}
      className={classes.root}
      onClose={() => layoutContext.setPanelState(false)}
    >
      <div className={classes.header}>
        <IconButton onClick={() => layoutContext.setPanelState(false)}>
          <ChevronRight />
        </IconButton>
        <Typography variant="h6">Create Bookmark</Typography>
      </div>
      <Divider />
      <TextField
        className={classes.input}
        required
        variant="outlined"
        label="Bookmark Name"
      />
      <TextField
        className={classes.input}
        required
        variant="outlined"
        label="Bookmark URL"
      />
      <div className={classes.categoryContainer}>
        <TextField
          className={classes.inputCategory}
          variant="outlined"
          label="Bookmark Category (optional)"
        />
        <Select
          variant="outlined"
          className={classes.inputSelect}
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          // value={10}
          // onChange={() => null)}
        >
          <MenuItem value={10}>Category 1</MenuItem>
          <MenuItem value={20}>Category 2</MenuItem>
          <MenuItem value={30}>Category 3</MenuItem>
        </Select>
      </div>

      <TextField
        multiline
        rows={4}
        className={classes.input}
        variant="outlined"
        label="Description (optional)"
      />
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          onClick={() => layoutContext.setPanelState(false)}
        >
          Cancel
        </Button>
        <Button className={classes.button} color="primary" variant="contained">
          Submit
        </Button>
      </div>
    </Drawer>
  )
}
