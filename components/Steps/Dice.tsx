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

const StepDice = () => {
  const classes = useStyles()
  const { entryTeamUsers, narrowedDices, onChangeDice } = useTeamUsers()

  return (
    <div className={classes.root}>
      {entryTeamUsers.map(({ id, name, dice }) => {
        const labelId = `dice-label-${id}`
        return (
          <FormControl key={id}>
            <InputLabel id={labelId}>{name}チーム</InputLabel>
            <Select
              labelId={labelId}
              value={dice}
              onChange={onChangeDice(id)}
            >
              <MenuItem value="">選択してください</MenuItem>
              {narrowedDices(dice).map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
            </Select>
          </FormControl>
        )
      })}
    </div>
  )
}

export default StepDice
