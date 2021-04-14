import React, { ReactNode } from "react"

import Drawer from "@material-ui/core/Drawer"
import makeStyles from "@material-ui/core/styles/makeStyles"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

import ChevronRight from "@material-ui/icons/ChevronRight"
import CircularProgress from "@material-ui/core/CircularProgress"

export const panelWidth = 500

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
  loadingIndicator: {
    marginLeft: theme.spacing(1),
  },
}))

interface Props {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
  loading?: boolean
}

export const Panel: React.FC<Props> = ({
  title,
  open,
  onClose,
  children,
  loading,
}) => {
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
        {loading && (
          <CircularProgress className={classes.loadingIndicator} size={25} />
        )}
      </div>
      <Divider />
      {children}
    </Drawer>
  )
}
