import React, { useContext, useEffect, useState } from "react"

import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Modal from "@material-ui/core/Modal"
import Typography from "@material-ui/core/Typography"

import { SettingsContext } from "~/context"
import {
  COOKING_COLLECTION,
  DEV_TEAM_COLLECTION,
  WORKOUT_COLLECTION,
} from "~/defines"
import { HeaderIcon } from "./HeaderIcon"

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 700,
    margin: "auto",
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      height: "80vh",
      "overflow-y": "scroll",
    },
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  section: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  linkSection: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    marginTop: theme.spacing(1),
    textDecoration: "none",
    fontSize: "16px",
    color: theme.palette.info.main,
  },
  bottomSection: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(2),
    },
  },
}))

export const OnboardingModal = () => {
  const classes = useStyles()
  const settingsContext = useContext(SettingsContext)

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (settingsContext.firstRun) {
      setTimeout(() => {
        setModalOpen(true)
      }, 1000)
    }
  }, [settingsContext.firstRun])

  const handleClose = () => {
    settingsContext.setFirstRun()
    setModalOpen(false)
  }

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modalContainer}>
        <div className={classes.headerContainer}>
          <HeaderIcon />
          <Typography variant="h4">Welcome to GistMarks</Typography>
        </div>
        <Typography>
          GistMarks is a bookmark manager that uses Github Gist to share
          bookmarks with others.
        </Typography>
        <div className={classes.section}>
          <Typography variant="h6">Creating Bookmarks</Typography>
          <Typography>
            To create a bookmark, click on the pencil icon in the top right of
            the header. You can also use the quick add bookmarklet to create
            bookmarks from anywhere.
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h6">Sharing Bookmarks</Typography>
          <Typography>
            When you are ready to share you bookmarks. Click on the gear icon in
            the header and select &quot;Github Gist&quot;. After logging in you
            can backup your collection to a new or existing Gist
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h6">Viewing Bookmarks</Typography>
          <Typography>
            To view a bookmark collection, navigate to{" "}
            <code>https://app.gistmarks.io/v/YOUR_GIST_ID</code>.
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h6">Need some inspiration?</Typography>
          <Typography>Check out some of these bookmark collections</Typography>
          <div className={classes.linkSection}>
            <a className={classes.link} href={COOKING_COLLECTION}>
              Recipe Collection
            </a>
            <a className={classes.link} href={WORKOUT_COLLECTION}>
              Workout Collection
            </a>
            <a className={classes.link} href={DEV_TEAM_COLLECTION}>
              Dev Team Collection
            </a>
          </div>
        </div>

        <div className={classes.bottomSection}>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Get Started
          </Button>
        </div>
      </div>
    </Modal>
  )
}
