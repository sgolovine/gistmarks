import React, { useContext } from "react"
import {
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { LayoutContext } from "../context/LayoutContext"
import { CheckBoxOutlineBlank, ChevronLeft, CheckBox } from "@material-ui/icons"

const sidebarWidth = 300

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: sidebarWidth,
  },
  header: {
    width: sidebarWidth,
    display: "flex",
    justifyContent: "flex-end",
  },
  categoryText: {
    paddingTop: "0.5rem",
    paddingLeft: "0.75rem",
  },
})

interface SidebarItemProps {
  label: string
  onClick: () => void
  selected: boolean
}

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
      onClose={() => layoutContext.setSidebarState(false)}
      variant="persistent"
      className={classes.container}
    >
      <div className={classes.header}>
        <IconButton onClick={() => layoutContext.setSidebarState(false)}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <div>
        <Typography className={classes.categoryText} variant="h5">
          Categories
        </Typography>
        <SidebarItem
          onClick={() => console.log("I have been clicked")}
          label="Category Name"
          selected
        />
        <SidebarItem
          onClick={() => console.log("I have been clicked")}
          label="Category Name"
        />
        <SidebarItem
          onClick={() => console.log("I have been clicked")}
          label="Category Name"
        />
        <SidebarItem
          onClick={() => console.log("I have been clicked")}
          label="Category Name"
        />
        <SidebarItem
          onClick={() => console.log("I have been clicked")}
          label="Category Name"
        />
      </div>
    </Drawer>
  )
}
