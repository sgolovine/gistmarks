import { Button, makeStyles, Modal, Typography } from "@material-ui/core"

import React, { useContext, useEffect, useState } from "react"
import { SettingsContext } from "~/context"
import {
  COOKING_COLLECTION,
  DEV_TEAM_COLLECTION,
  WORKOUT_COLLECTION,
} from "~/defines"

const HeaderIcon = () => (
  <svg
    width="350"
    height="350"
    viewBox="0 0 350 350"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <mask id="path-1-inside-1" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M81 32C67.1929 32 56 43.1929 56 57V327C56 328.965 57.1334 330.665 58.782 331.482L175 225L291.218 331.482C292.867 330.665 294 328.965 294 327V57C294 43.1929 282.807 32 269 32H81Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81 32C67.1929 32 56 43.1929 56 57V327C56 328.965 57.1334 330.665 58.782 331.482L175 225L291.218 331.482C292.867 330.665 294 328.965 294 327V57C294 43.1929 282.807 32 269 32H81Z"
        fill="white"
      />
      <path
        d="M58.782 331.482L56.5611 335.962L59.6323 337.485L62.1598 335.169L58.782 331.482ZM175 225L178.378 221.313L175 218.219L171.622 221.313L175 225ZM291.218 331.482L287.84 335.169L290.368 337.485L293.439 335.962L291.218 331.482ZM61 57C61 45.9543 69.9543 37 81 37V27C64.4315 27 51 40.4315 51 57H61ZM61 327V57H51V327H61ZM61.0029 327.003C61.0044 327.003 61.0034 327.003 61.0012 327.001C60.9988 326.999 60.9973 326.997 60.9969 326.996C60.9968 326.996 60.9981 326.998 60.9994 327.002C60.9999 327.004 61.0002 327.006 61.0003 327.006C61.0003 327.007 61 327.005 61 327H51C51 330.937 53.2759 334.333 56.5611 335.962L61.0029 327.003ZM62.1598 335.169L178.378 228.687L171.622 221.313L55.4043 327.796L62.1598 335.169ZM171.622 228.687L287.84 335.169L294.596 327.796L178.378 221.313L171.622 228.687ZM289 327C289 327.005 289 327.007 289 327.006C289 327.006 289 327.004 289.001 327.002C289.002 326.998 289.003 326.996 289.003 326.996C289.003 326.997 289.001 326.999 288.999 327.001C288.997 327.003 288.996 327.003 288.997 327.003L293.439 335.962C296.724 334.333 299 330.937 299 327H289ZM289 57V327H299V57H289ZM269 37C280.046 37 289 45.9543 289 57H299C299 40.4315 285.569 27 269 27V37ZM81 37H269V27H81V37Z"
        fill="#FA00FF"
        mask="url(#path-1-inside-1)"
      />
      <path
        d="M58.782 331.482L56.5611 335.962L59.6323 337.485L62.1598 335.169L58.782 331.482ZM175 225L178.378 221.313L175 218.219L171.622 221.313L175 225ZM291.218 331.482L287.84 335.169L290.368 337.485L293.439 335.962L291.218 331.482ZM61 57C61 45.9543 69.9543 37 81 37V27C64.4315 27 51 40.4315 51 57H61ZM61 327V57H51V327H61ZM61.0029 327.003C61.0044 327.003 61.0034 327.003 61.0012 327.001C60.9988 326.999 60.9973 326.997 60.9969 326.996C60.9968 326.996 60.9981 326.998 60.9994 327.002C60.9999 327.004 61.0002 327.006 61.0003 327.006C61.0003 327.007 61 327.005 61 327H51C51 330.937 53.2759 334.333 56.5611 335.962L61.0029 327.003ZM62.1598 335.169L178.378 228.687L171.622 221.313L55.4043 327.796L62.1598 335.169ZM171.622 228.687L287.84 335.169L294.596 327.796L178.378 221.313L171.622 228.687ZM289 327C289 327.005 289 327.007 289 327.006C289 327.006 289 327.004 289.001 327.002C289.002 326.998 289.003 326.996 289.003 326.996C289.003 326.997 289.001 326.999 288.999 327.001C288.997 327.003 288.996 327.003 288.997 327.003L293.439 335.962C296.724 334.333 299 330.937 299 327H289ZM289 57V327H299V57H289ZM269 37C280.046 37 289 45.9543 289 57H299C299 40.4315 285.569 27 269 27V37ZM81 37H269V27H81V37Z"
        fill="url(#paint0_linear)"
        mask="url(#path-1-inside-1)"
      />
      <path
        d="M58.782 331.482L56.5611 335.962L59.6323 337.485L62.1598 335.169L58.782 331.482ZM175 225L178.378 221.313L175 218.219L171.622 221.313L175 225ZM291.218 331.482L287.84 335.169L290.368 337.485L293.439 335.962L291.218 331.482ZM61 57C61 45.9543 69.9543 37 81 37V27C64.4315 27 51 40.4315 51 57H61ZM61 327V57H51V327H61ZM61.0029 327.003C61.0044 327.003 61.0034 327.003 61.0012 327.001C60.9988 326.999 60.9973 326.997 60.9969 326.996C60.9968 326.996 60.9981 326.998 60.9994 327.002C60.9999 327.004 61.0002 327.006 61.0003 327.006C61.0003 327.007 61 327.005 61 327H51C51 330.937 53.2759 334.333 56.5611 335.962L61.0029 327.003ZM62.1598 335.169L178.378 228.687L171.622 221.313L55.4043 327.796L62.1598 335.169ZM171.622 228.687L287.84 335.169L294.596 327.796L178.378 221.313L171.622 228.687ZM289 327C289 327.005 289 327.007 289 327.006C289 327.006 289 327.004 289.001 327.002C289.002 326.998 289.003 326.996 289.003 326.996C289.003 326.997 289.001 326.999 288.999 327.001C288.997 327.003 288.996 327.003 288.997 327.003L293.439 335.962C296.724 334.333 299 330.937 299 327H289ZM289 57V327H299V57H289ZM269 37C280.046 37 289 45.9543 289 57H299C299 40.4315 285.569 27 269 27V37ZM81 37H269V27H81V37Z"
        fill="url(#paint1_linear)"
        mask="url(#path-1-inside-1)"
      />
    </g>
    <mask id="path-3-inside-2" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115 19C106.716 19 100 25.7157 100 34V314C100 315.328 100.518 316.536 101.363 317.431L175 239L248.637 317.431C249.482 316.536 250 315.328 250 314V34C250 25.7157 243.284 19 235 19H115Z"
      />
    </mask>
    <g filter="url(#filter1_i)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115 19C106.716 19 100 25.7157 100 34V314C100 315.328 100.518 316.536 101.363 317.431L175 239L248.637 317.431C249.482 316.536 250 315.328 250 314V34C250 25.7157 243.284 19 235 19H115Z"
        fill="white"
      />
    </g>
    <path
      d="M101.363 317.431L97.7272 320.863L101.373 324.726L105.008 320.854L101.363 317.431ZM175 239L178.645 235.578L175 231.695L171.355 235.578L175 239ZM248.637 317.431L244.992 320.854L248.627 324.726L252.273 320.863L248.637 317.431ZM105 34C105 28.4772 109.477 24 115 24V14C103.954 14 95 22.9543 95 34H105ZM105 314V34H95V314H105ZM104.999 313.999L105 314H95C95 316.655 96.041 319.077 97.7272 320.863L104.999 313.999ZM105.008 320.854L178.645 242.422L171.355 235.578L97.7181 314.009L105.008 320.854ZM171.355 242.422L244.992 320.854L252.282 314.009L178.645 235.578L171.355 242.422ZM245 314L245.001 313.999L252.273 320.863C253.959 319.077 255 316.655 255 314H245ZM245 34V314H255V34H245ZM235 24C240.523 24 245 28.4772 245 34H255C255 22.9543 246.046 14 235 14V24ZM115 24H235V14H115V24Z"
      fill="#FF0099"
      mask="url(#path-3-inside-2)"
    />
    <path
      d="M101.363 317.431L97.7272 320.863L101.373 324.726L105.008 320.854L101.363 317.431ZM175 239L178.645 235.578L175 231.695L171.355 235.578L175 239ZM248.637 317.431L244.992 320.854L248.627 324.726L252.273 320.863L248.637 317.431ZM105 34C105 28.4772 109.477 24 115 24V14C103.954 14 95 22.9543 95 34H105ZM105 314V34H95V314H105ZM104.999 313.999L105 314H95C95 316.655 96.041 319.077 97.7272 320.863L104.999 313.999ZM105.008 320.854L178.645 242.422L171.355 235.578L97.7181 314.009L105.008 320.854ZM171.355 242.422L244.992 320.854L252.282 314.009L178.645 235.578L171.355 242.422ZM245 314L245.001 313.999L252.273 320.863C253.959 319.077 255 316.655 255 314H245ZM245 34V314H255V34H245ZM235 24C240.523 24 245 28.4772 245 34H255C255 22.9543 246.046 14 235 14V24ZM115 24H235V14H115V24Z"
      fill="url(#paint2_linear)"
      mask="url(#path-3-inside-2)"
    />
    <defs>
      <filter
        id="filter0_d"
        x="52"
        y="32"
        width="246"
        height="307.482"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i"
        x="100"
        y="19"
        width="150"
        height="302.431"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="175"
        y1="32"
        x2="175"
        y2="331.482"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00F0FF" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="175"
        y1="32"
        x2="175"
        y2="331.482"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00D1FF" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="175"
        y1="19"
        x2="175"
        y2="317.431"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00F0FF" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

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
    if (settingsContext.state.firstRun) {
      setTimeout(() => {
        setModalOpen(true)
      }, 1000)
    }
  }, [settingsContext.state.firstRun])

  const handleClose = () => {
    settingsContext.actions.setFirstRun()
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
