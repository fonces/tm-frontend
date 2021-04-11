import { useEffect } from 'react'
import getUsers from '@/api/users/GET'
import useStep from '@/hooks/step'
import useTeams, { Provider as TeamsProvider } from '@/stores/teams'
import useUsers, { Provider as UsersProvider } from '@/stores/users'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import StepTeam from '@/components/Steps/Team'

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
))

function getSteps () {
  return ['参加ユーザー設定', 'ダイス値入力', '優先卓設定', '確認']
}

function getStepContent (step: number) {
  switch (step) {
    case 0:
      return <StepTeam />
    case 1:
      return '各チームのダイスの値を入力してください'
    case 2:
      return '優先的に作成する卓を選択してください'
    case 3:
      return '作成しますか？'
    default:
      return 'Unknown step'
  }
}

const Index = () => {
  const classes = useStyles()
  const steps = getSteps()
  const { activeStep, onNext, onBack, onReset } = useStep()
  const { setTeams } = useTeams()
  const { setUsers } = useUsers()

  useEffect(() => {
    getUsers().then(users => {
      setTeams(users)
      setUsers(users)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {activeStep !== 0 && <Button onClick={onBack} variant="outlined" className={classes.button}>前へ</Button>}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '作成' : '次へ'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>卓の作成が完了しました。</Typography>
          <Button onClick={onReset} variant="outlined" className={classes.button}>リセット</Button>
        </Paper>
      )}
    </div>
  )
}

const EnhanceIndex = () => (
  <TeamsProvider>
    <UsersProvider>
      <Index />
    </UsersProvider>
  </TeamsProvider>
)

export default EnhanceIndex
