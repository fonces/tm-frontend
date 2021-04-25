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
    row: {
      width: '100%',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: '1fr max-content',
    },
    priority: {
      width: '60px',
      marginLeft: theme.spacing(2),
    },
  }),
)

const dices = range(6, 36)

const StepDice = () => {
  const classes = useStyles()
  const {
    byId,
    entryTeams,
    settedDiceTeams,
    isButtingDice,
    updateTeams,
  } = useTeams()

  const entries = entryTeams.map(({ id, name, dice, priority }) => ({
    id,
    name,
    dice,
    priority,
    diceLabelId: `dice-label-${id}`,
    priorityLabelId: `priority-label-${id}`,
  }))

  const createButtingCounts = (currentId: string, currentDice: number) => (
    range(
      1,
      settedDiceTeams
        .filter(({ id }) => id !== currentId)
        .reduce((acc, { dice }) => acc + (dice === currentDice ? 1 : 0), 1),
    )
  )

  const onChangeDice = (id: string) => (event: ChangeEvent<{ value: unknown }>) => {
    updateTeams({
      ...byId[id],
      dice: event.target.value as number,
    })
  }

  const onChangePriority = (id: string) => (event: ChangeEvent<{ value: unknown }>) => {
    updateTeams({
      ...byId[id],
      priority: event.target.value as number,
    })
  }

  return (
    <div className={classes.root}>
      {entries.map(({ id, name, dice, priority, diceLabelId, priorityLabelId }) => (
        <div key={id} className={classes.row}>
          <FormControl>
            <InputLabel id={diceLabelId}>{name}チーム</InputLabel>
            <Select labelId={diceLabelId} value={dice} onChange={onChangeDice(id)}>
              <MenuItem value={0}>選択してください</MenuItem>
              {dices.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
          {isButtingDice(id, dice) && (
            <FormControl className={classes.priority}>
              <InputLabel id={priorityLabelId}>優先度</InputLabel>
              <Select labelId={priorityLabelId} value={priority} onChange={onChangePriority(id)}>
                {createButtingCounts(id, dice).map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          )}
        </div>
      ))}
    </div>
  )
}

export default StepDice
