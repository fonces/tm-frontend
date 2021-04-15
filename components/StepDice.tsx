import { ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import useTeams from '@/stores/teams'
import { range } from '@/utils/array'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      gridRowGap: theme.spacing(2),
    },
  }),
)

const dices = range(6, 36)

const StepDice = () => {
  const classes = useStyles()
  const { byId, entryTeams, updateTeam } = useTeams()

  const entries = entryTeams.map(({ id, name, dice }) => ({
    id,
    name,
    dice,
    labelId: `dice-label-${id}`,
  }))

  const narrowDices = (myDice: number) => {
    const selectedDices = entryTeams.map(({ dice }) => dice)
    return dices.filter(dice => !selectedDices.includes(dice) || dice === myDice)
  }

  const onChangeDice = (id: string) => (event: ChangeEvent<{ value: unknown }>) => {
    updateTeam({
      ...byId[id],
      dice: event.target.value as number,
    })
  }

  return (
    <div className={classes.root}>
      {entries.map(({ id, name, dice, labelId }) => (
        <FormControl key={id}>
          <InputLabel id={labelId}>{name}チーム</InputLabel>
          <Select labelId={labelId} value={dice} onChange={onChangeDice(id)}>
            <MenuItem value={0}>選択してください</MenuItem>
            {narrowDices(dice).map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </Select>
        </FormControl>
      ))}
    </div>
  )
}

export default StepDice
