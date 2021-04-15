import { ChangeEvent } from 'react'
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
  const { teams, byId, updateTeam } = useTeams()

  const onChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    updateTeam({
      ...byId[id],
      users: +event.currentTarget!.value,
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
          onChange={onChange(id)}
        />
      ))}
    </div>
  )
}

export default StepTeam
