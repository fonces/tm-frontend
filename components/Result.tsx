import { makeStyles, styled, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { PRIORITY_KANJI_MAP } from '@/helpers/consts'
import useMaker from '@/hooks/maker'
import useSnackbar from '@/hooks/snackbar'
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
  const snackbar = useSnackbar()
  const {
    priority,
    users,
    numbers,
    tables,
    allocate,
    getCopyText,
  } = useMaker()
  const { byId: teamsById } = useTeams()

  const onCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(getCopyText())
        snackbar.success('コピーしました')
      } else {
        throw new Error('お使いのブラウザにはクリップボード機能がありません。')
      }
    } catch (e) {
      snackbar.error(e.message)
    }
  }

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
        {tables[4] > 0 && <StyledTypography variant="body2">四麻卓: 1 ~ {tables[4]}卓</StyledTypography>}
        {tables[3] > 0 && <StyledTypography variant="body2">三麻卓: {tables[4] + 1} ~ {tables[4] + tables[3]}卓</StyledTypography>}
      </CardContent>
      <CardContent>
        <StyledTypography color="primary" gutterBottom>
          チーム情報
        </StyledTypography>
        {allocate.map(({ id, tables }) => (
          <CardContent key={id} className={classes.nest}>
            <StyledTypography variant="body2" color="textSecondary" gutterBottom>{teamsById[id].name}チーム</StyledTypography>
            <StyledTypography variant="body2">ダイス: {teamsById[id].dice}</StyledTypography>
            {tables[4].length > 0 && <StyledTypography variant="body2">四麻卓: {tables[4].join(', ')}</StyledTypography>}
            {tables[3].length > 0 && <StyledTypography variant="body2">三麻卓: {tables[3].join(', ')}</StyledTypography>}
          </CardContent>
        ))}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" onClick={onReset}>リセット</Button>
        <Button size="small" variant="contained" color="primary" onClick={onCopy}>コピー</Button>
      </CardActions>
    </Card>
  )
}

export default Result
