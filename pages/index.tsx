import { useEffect } from 'react'
import getUsers from '@/api/users/GET'
import useStep from '@/hooks/step'
import useTeams, { Provider as TeamsProvider } from '@/stores/teams'
import useUsers, { Provider as UsersProvider } from '@/stores/users'
import useSettings, { Provider as SettingsProvider } from '@/stores/settings'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import StepTeam from '@/components/Steps/Team'
import StepDice from '@/components/Steps/Dice'
import StepOther from '@/components/Steps/Other'

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      width: '100%',
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
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
))

const Index = () => {
  const classes = useStyles()
  const { activeStep, onNext, onBack, onReset } = useStep()
  const { setTeams } = useTeams()
  const { setUsers, isSelectedUsers } = useUsers()
  const { loadSettings } = useSettings()

  useEffect(() => {
    loadSettings()
    getUsers().then(users => {
      setTeams(users)
      setUsers(users)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>卓リスト作成</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>参加ユーザー設定</StepLabel>
            <StepContent>
              <StepTeam />
              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isSelectedUsers}
                  onClick={onNext}
                >次へ</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>ダイス値入力</StepLabel>
            <StepContent>
              <StepDice />
              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  // disabled={!isAllSettedDice}
                  onClick={onNext}
                >次へ</Button>
                <Button onClick={onBack} variant="outlined">前へ</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>詳細設定</StepLabel>
            <StepContent>
              <StepOther />
              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onNext}
                >次へ</Button>
                <Button onClick={onBack} variant="outlined">前へ</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>確認</StepLabel>
            <StepContent>
              confirm
              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onNext}
                >作成</Button>
                <Button onClick={onBack} variant="outlined">修正</Button>
              </div>
            </StepContent>
          </Step>
      </Stepper>
      {activeStep === 4 && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>卓の作成が完了しました。</Typography>
          <Button onClick={onReset} variant="outlined">リセット</Button>
        </Paper>
      )}
    </div>
  )
}

const EnhanceIndex = () => (
  <SettingsProvider>
    <TeamsProvider>
      <UsersProvider>
        <Index />
      </UsersProvider>
    </TeamsProvider>
  </SettingsProvider>
)

export default EnhanceIndex
