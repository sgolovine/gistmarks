import { Switch, Typography, makeStyles } from "@material-ui/core"
import React from "react"

interface Props {
  label: string
  value: boolean
  onToggle: () => void
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontWeight: 600,
    fontSize: "1.1rem",
  },
})

export const SwitchItem: React.FC<Props> = ({ label, value, onToggle }) => {
  const name = label.replace(" ", "_")
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography className={classes.label}>{label}</Typography>
      <Switch color="primary" checked={value} onChange={onToggle} name={name} />
    </div>
  )
}
