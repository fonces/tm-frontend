import { range } from '@/utils/array'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import useTeamUsers from '@/hooks/teamUsers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      gridRowGap: theme.spacing(2),
    },
  }),
)

const DICE_MIN = 6
const DICE_MAX = 6 * 6

const StepDice = () => {
  const classes = useStyles()
  const { teamUsers, onChangeDice } = useTeamUsers()

  return (
    <div className={classes.root}>
      {teamUsers.map(({ id, name, dice }) => {
        const labelId = `dice-label-${id}`
        return (
          <FormControl key={id}>
            <InputLabel id={labelId}>{name}チーム</InputLabel>
            <Select
              labelId={labelId}
              value={dice ? String(dice) : ''}
              onChange={onChangeDice(id)}
            >
              <MenuItem value="">選択してください</MenuItem>
              {range(DICE_MIN, DICE_MAX).map(String).map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
            </Select>
          </FormControl>
        )
      })}
    </div>
  )
}

export default StepDice
