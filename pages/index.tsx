import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'

import getTeams from '@/api/teams/GET'
import useLoading from '@/hooks/loading'
import useSnackbar from '@/hooks/snackbar'
import useStep from '@/hooks/step'
import Result from '@/components/Result'
import AppBar from '@/components/AppBar'
import StepDice from '@/components/StepDice'
import StepOther from '@/components/StepOther'
import StepTeam from '@/components/StepTeam'
import useTeams, { Provider as TeamsProvider } from '@/stores/teams'
import useSettings, { Provider as SettingsProvider } from '@/stores/settings'

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      width: '100%',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    title: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
    actionsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      marginTop: theme.spacing(2),
    },
    optionsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: -theme.spacing(1.2),
      marginBottom: theme.spacing(1.5),
      marginLeft: -theme.spacing(2),
    },
    resetContainer: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  })
))

const Index = () => {
  const classes = useStyles()
  const snackbar = useSnackbar()
  const loading = useLoading({ immediate: true })
  const {
    activeStep,
    onNext,
    onBack,
    onReset,
  } = useStep(4)
  const {
    teams,
    entryTeams,
    isAllSettedDice,
    isAllSettedPriority,
    setTeams,
    updateTeams,
  } = useTeams()
  const { loadSettings } = useSettings()

  useEffect(() => {
    loadSettings()
    getTeams()
      .then(teams => setTeams(teams))
      .catch(() => snackbar.error('データ取得エラー'))
      .finally(() => loading.end())
  }, [])

  const onClearUsers = () => {
    updateTeams(teams.map(team => ({ ...team, users: 0 })))
  }
  const onClearDices = () => {
    updateTeams(teams.map(team => ({ ...team, dice: 0, priority: 1 })))
  }

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading.now}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>参加チーム設定</StepLabel>
          <StepContent>
            <div className={classes.optionsContainer}>
              <div />
              <IconButton aria-label="delete" onClick={onClearUsers}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
            <StepTeam />
            <div className={classes.actionsContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={entryTeams.length < 2}
                onClick={onNext}
              >次へ</Button>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>ダイス値設定</StepLabel>
          <StepContent>
            <div className={classes.optionsContainer}>
              <IconButton aria-label="back" onClick={onBack}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete" onClick={onClearDices}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
            <StepDice />
            <div className={classes.actionsContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={!isAllSettedDice || !isAllSettedPriority}
                onClick={onNext}
              >次へ</Button>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>詳細設定</StepLabel>
          <StepContent>
            <div className={classes.optionsContainer}>
              <IconButton aria-label="back" onClick={onBack}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </div>
            <StepOther />
            <div className={classes.actionsContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={onNext}
              >次へ</Button>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>作成結果</StepLabel>
          <StepContent>
            <Result onReset={onReset} />
          </StepContent>
        </Step>
      </Stepper>
    </div>
  )
}

const EnhanceIndex = () => (
  <SnackbarProvider maxSnack={1}>
    <SettingsProvider>
      <TeamsProvider>
        <Index />
      </TeamsProvider>
    </SettingsProvider>
  </SnackbarProvider>
)

export default EnhanceIndex
