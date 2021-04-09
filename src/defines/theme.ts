import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[400],
    },
    secondary: {
      main: red[400],
    },
  },
})
