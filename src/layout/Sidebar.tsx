import React, { useContext } from "react"

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography"

import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import CheckBox from "@material-ui/icons/CheckBox"

import { LayoutContext } from "../context/LayoutContext"
import List from "@material-ui/core/List"

const sidebarWidth = 300

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: sidebarWidth,
  },
  header: {
    width: sidebarWidth,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
  },

  categoryText: {
    paddingTop: "0.5rem",
    paddingLeft: "0.75rem",
  },
}))

interface SidebarItemProps {
  label: string
  onClick: () => void
  selected: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  onClick,
  selected,
}) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        {selected ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItem>
  )
}

export default function Sidebar() {
  const layoutContext = useContext(LayoutContext)
  const classes = useStyles()

  return (
    <Drawer
      anchor={"left"}
      open={layoutContext.sidebarOpen}
      onClose={layoutContext.closeSidebar}
      variant="persistent"
      className={classes.container}
    >
      <div className={classes.header}>
        <Typography variant="h6">Categories</Typography>
        <IconButton onClick={layoutContext.closeSidebar}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>{/* Sidebar Items Go Here */}</List>
    </Drawer>
  )
}
