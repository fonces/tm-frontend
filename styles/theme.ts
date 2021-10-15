import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const basicStyles = {
  padding: 0,
  margin: 0,
  fontFamily: 'Noto Sans Japanese, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  lineHeight: 1.6,
  fontSize: '18px',
}
const baseColor = '#F5F5F5'

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
    MuiPaper: {
      root: {
        backgroundColor: baseColor,
      },
    },
  },
  palette: {
    error: {
      main: red.A400,
    },
    background: {
      default: baseColor,
    },
  },
})

export default theme
