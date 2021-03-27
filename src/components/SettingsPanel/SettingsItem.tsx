import React, { ReactNode } from "react"
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

interface SettingsItemProps {
  title: string
  children: ReactNode
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  children,
}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
)
