import { useState } from 'react'
import { makeStyles, styled, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import isMobile from 'ismobilejs'
import dayjs from 'dayjs'

import postResult from '@/api/result/POST'
import { PRIORITY_KANJI_MAP } from '@/helpers/consts'
import useMaker from '@/hooks/maker'
import useSnackbar from '@/hooks/snackbar'
import useTimer from '@/hooks/timer'
import useWindow from '@/hooks/window'
import useTeams from '@/stores/teams'

const StyledTypography = styled(Typography)({
  fontSize: 14,
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  nest: {
    padding: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

type ResultProps = {
  onReset: () => void
}

const Result = ({ onReset }: ResultProps) => {
  const classes = useStyles()
  const {
    priority,
    users,
    numbers,
    tables,
    allocate,
    getCopyText,
  } = useMaker()
  const snackbar = useSnackbar()
  const { byId: teamsById } = useTeams()

  const [reservable, setReservable] = useState(false)
  const [reserved, setReserved] = useState(false)
  const [posted, setPosted] = useState(false)

  const onResetEnhance = () => {
    setReserved(false)
    setPosted(false)
    onReset()
  }

  const onCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(getCopyText())
        snackbar.success('コピーしました')
      } else {
        throw new Error('お使いのブラウザにはクリップボード機能がありません。')
      }
    } catch (e) {
      snackbar.error((e as Error).message)
    }
  }

  const onReserve = () => {
    setReserved(true)
  }

  const onPost = () => {
    setReserved(false)
    setPosted(true)
    postResult(getCopyText(dayjs().format('HH:mm')))
      .then(() => snackbar.success('送信しました'))
      .catch(() => snackbar.error('データ送信エラー'))
  }

  useTimer(() => {
    if (reserved) {
      onPost()
    }
  }, { minute: 0, second: 0 })

  useWindow(() => {
    setReservable(!isMobile().any)
  })

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <StyledTypography color="primary" gutterBottom>
          基本情報
        </StyledTypography>
        <StyledTypography variant="body2">参加総数: {users}人</StyledTypography>
        <StyledTypography variant="body2">優先作成卓: {PRIORITY_KANJI_MAP[priority]}麻</StyledTypography>
        <StyledTypography variant="body2">四麻人数: {numbers[4]}人</StyledTypography>
        <StyledTypography variant="body2">三麻人数: {numbers[3]}人</StyledTypography>
      </CardContent>
      <CardContent>
        <StyledTypography color="primary" gutterBottom>
          卓情報
        </StyledTypography>
        {0 < tables[4] && <StyledTypography variant="body2">四麻卓: 1 ~ {tables[4]}卓</StyledTypography>}
        {0 < tables[3] && <StyledTypography variant="body2">三麻卓: {tables[4] + 1} ~ {tables[4] + tables[3]}卓</StyledTypography>}
      </CardContent>
      <CardContent>
        <StyledTypography color="primary" gutterBottom>
          チーム情報
        </StyledTypography>
        {allocate.map(({ id, tables }) => (
          <CardContent key={id} className={classes.nest}>
            <StyledTypography variant="body2" color="textSecondary" gutterBottom>{teamsById[id].name}チーム</StyledTypography>
            <StyledTypography variant="body2">ダイス: {teamsById[id].dice}</StyledTypography>
            {0 < tables[4].length && <StyledTypography variant="body2">四麻卓: {tables[4].join(', ')}</StyledTypography>}
            {0 < tables[3].length && <StyledTypography variant="body2">三麻卓: {tables[3].join(', ')}</StyledTypography>}
            <StyledTypography variant="body2">スクリーンショット枚数: {tables[4].length + (tables[3].length * 2)}</StyledTypography>
          </CardContent>
        ))}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={onResetEnhance}>リセット</Button>
        <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
          <Button onClick={onCopy}>コピー</Button>
          {reservable && <Button disabled={posted || reserved} onClick={onReserve}>送信予約</Button>}
          <Button disabled={posted} onClick={onPost}>送信</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}

export default Result
