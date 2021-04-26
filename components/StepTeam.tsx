import { ChangeEvent, FocusEvent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import useTeams from '@/stores/teams'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      gridRowGap: theme.spacing(1),
    },
  }),
)

const StepTeam = () => {
  const classes = useStyles()
  const { teams, byId, updateTeams } = useTeams()

  const onFocus = (id: string) => (event: FocusEvent<HTMLInputElement>) => {
    const team = byId[id]
    event.currentTarget!.setSelectionRange(0, String(team.users).length)
  }

  const onChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const users = +event.currentTarget!.value
    updateTeams({
      ...byId[id],
      users: Number.isInteger(users) ? users : 0,
    })
  }

  return (
    <div className={classes.root}>
      {teams.map(({ id, name, users }, key) => (
        <TextField
          key={key}
          type="tel"
          label={`${name}チーム`}
          value={users}
          onFocus={onFocus(id)}
          onChange={onChange(id)}
        />
      ))}
    </div>
  )
}

export default StepTeam
