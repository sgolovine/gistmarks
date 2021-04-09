import React, { ReactNode } from "react"
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

interface SettingsItemProps {
  title: string
  children: ReactNode
}

const useStyles = makeStyles({
  itemContent: {
    display: "flex",
    flexDirection: "column",
  },
})

export const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  children,
}) => {
  const classes = useStyles()

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.itemContent}>{children}</div>
      </AccordionDetails>
    </Accordion>
  )
}
