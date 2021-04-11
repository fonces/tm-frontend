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
import StepDice from '@/components/Steps/Dice'

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
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
))

const Index = () => {
  const classes = useStyles()
  const { activeStep, onNext, onBack, onReset } = useStep()
  const { setTeams, isAllSettedDice } = useTeams()
  const { setUsers, isSelectedUsers } = useUsers()

  useEffect(() => {
    getUsers().then(users => {
      setTeams(users)
      setUsers(users)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>参加ユーザー設定</StepLabel>
            <StepContent>
              <StepTeam />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isSelectedUsers}
                    onClick={onNext}
                    className={classes.button}
                  >次へ</Button>
                </div>
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
                  disabled={!isAllSettedDice}
                  onClick={onNext}
                  className={classes.button}
                >次へ</Button>
                <Button onClick={onBack} variant="outlined" className={classes.button}>前へ</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>詳細設定</StepLabel>
            <StepContent>
              優先的に作成する卓を選択してください
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onNext}
                    className={classes.button}
                  >次へ</Button>
                  <Button onClick={onBack} variant="outlined" className={classes.button}>前へ</Button>
                </div>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>確認</StepLabel>
            <StepContent>
              confirm
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onNext}
                    className={classes.button}
                  >作成</Button>
                  <Button onClick={onBack} variant="outlined" className={classes.button}>前へ</Button>
                </div>
              </div>
            </StepContent>
          </Step>
      </Stepper>
      {activeStep === 4 && (
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
