import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const basicStyles = {
  padding: 0,
  margin: 0,
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  lineHeight: 1.6,
  fontSize: '18px',
}

// Create a theme instance.
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          ...basicStyles,
        },
        body: {
          ...basicStyles,
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
