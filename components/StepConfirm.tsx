import { makeStyles, styled, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { PRIORITY_KANJI_MAP } from '@/helpers/consts'
import useMaker from '@/hooks/maker'
import useTeams from '@/stores/teams'
import useSettings from '@/stores/settings'

const StyledTypography = styled(Typography)({
  fontSize: 14,
})

const StyledCardContent = styled(CardContent)({
  paddingBottom: 0,
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  nest: {
    padding: theme.spacing(1),
  },
}))

const StepConfirm = () => {
  const classes = useStyles()
  const { users, tables } = useMaker()
  const { entryTeams, diceSorted } = useTeams()
  const { priority } = useSettings()

  return (
    <Card className={classes.root} variant="outlined">
      <StyledCardContent>
        <StyledTypography color="primary" gutterBottom>
          参加者数
        </StyledTypography>
        <StyledCardContent className={classes.nest}>
          <StyledTypography variant="body2">総人数 : {users.toLocaleString()}人</StyledTypography>
          {entryTeams.map(({ id, name, users }) => (
            <StyledTypography key={id} variant="body2">{name}チーム : {users.toLocaleString()}人</StyledTypography>
          ))}
        </StyledCardContent>
      </StyledCardContent>
      <StyledCardContent>
        <StyledTypography color="primary" gutterBottom>
          ダイス
        </StyledTypography>
        <StyledCardContent className={classes.nest}>
          {diceSorted.map(({ id, name, dice }) => (
            <StyledTypography key={id} variant="body2">{name}チーム : {dice.toLocaleString()}</StyledTypography>
          ))}
        </StyledCardContent>
      </StyledCardContent>
      <StyledCardContent>
        <StyledTypography color="primary" gutterBottom>
          卓情報
        </StyledTypography>
        <StyledCardContent className={classes.nest}>
          <StyledTypography variant="body2" gutterBottom>優先卓 : {PRIORITY_KANJI_MAP[priority]}麻</StyledTypography>
          <StyledTypography variant="body2">三麻 : {tables[3]}卓</StyledTypography>
          <StyledTypography variant="body2">四麻 : {tables[4]}卓</StyledTypography>
        </StyledCardContent>
      </StyledCardContent>
    </Card>
  )
}

export default StepConfirm
