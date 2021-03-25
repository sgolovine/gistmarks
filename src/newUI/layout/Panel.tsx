import React, { ReactNode } from "react"

import Drawer from "@material-ui/core/Drawer"
import makeStyles from "@material-ui/core/styles/makeStyles"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

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
    [theme.breakpoints.up("xs")]: {
      width: panelWidth,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
    },
  },
}))

interface Props {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}

export const Panel: React.FC<Props> = ({ title, open, onClose, children }) => {
  const classes = useStyles()

  return (
    <Drawer
      anchor={"right"}
      open={open}
      className={classes.root}
      onClose={onClose}
    >
      <div className={classes.header}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </div>
      <Divider />
      {children}
    </Drawer>
  )
}
