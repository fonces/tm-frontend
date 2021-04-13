import { useState, useEffect } from 'react'
import { useSnackbar, SnackbarProvider, VariantType } from 'notistack'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import getUsers from '@/api/users/GET'
import useStep from '@/hooks/step'
import useMaker from '@/hooks/maker'
import useTeamUsers from '@/hooks/teamUsers'
import StepConfirm from '@/components/StepConfirm'
import StepDice from '@/components/StepDice'
import StepOther from '@/components/StepOther'
import StepTeam from '@/components/StepTeam'
import useTeams, { Provider as TeamsProvider } from '@/stores/teams'
import useUsers, { Provider as UsersProvider } from '@/stores/users'
import useSettings, { Provider as SettingsProvider } from '@/stores/settings'
import { wait } from '@/utils/timer'

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
    resetContainer: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  })
))

const Index = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { activeStep, isStepCompleted, onNext, onBack, onReset } = useStep(4)
  const { isCreatable, getCopyText } = useMaker()
  const { setTeams } = useTeams()
  const { setUsers, isSelectedUsers } = useUsers()
  const { isAllSettedDice } = useTeamUsers()
  const { loadSettings } = useSettings()

  const openSnackbar = async (message: string, variant: VariantType) => {
    const key = enqueueSnackbar(message, { variant })
    await wait(5000)
    closeSnackbar(key)
  }

  useEffect(() => {
    loadSettings()
    getUsers()
      .then(users => {
        setTeams(users)
        setUsers(users)
      })
      .catch(() => openSnackbar('データ取得エラー', 'error'))
      .finally(() => setLoading(false))
  }, [])

  const onCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(getCopyText())
        openSnackbar('コピーしました', 'success')
      } else {
        throw new Error('お使いのブラウザにはクリップボード機能がありません。')
      }
    } catch (e) {
      openSnackbar(e.message, 'error')
    }
  }

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
                  disabled={!isAllSettedDice}
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
            <StepLabel>設定内容確認</StepLabel>
            <StepContent>
              <StepConfirm />
              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isCreatable}
                  onClick={onNext}
                >作成</Button>
                <Button onClick={onBack} variant="outlined">修正</Button>
              </div>
            </StepContent>
          </Step>
      </Stepper>
      {isStepCompleted && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>卓の作成が完了しました。</Typography>
          <div className={classes.actionsContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={onCopy}
            >コピー</Button>
            <Button onClick={onReset} variant="outlined">リセット</Button>
          </div>
        </Paper>
      )}
    </div>
  )
}

const EnhanceIndex = () => (
  <SnackbarProvider maxSnack={1}>
    <SettingsProvider>
      <TeamsProvider>
        <UsersProvider>
          <Index />
        </UsersProvider>
      </TeamsProvider>
    </SettingsProvider>
  </SnackbarProvider>
)

export default EnhanceIndex
