import { ChangeEvent } from 'react'
import useSettings from '@/stores/settings'
import { Priority } from '@/stores/settings/types'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
)

const StepOther = () => {
  const classes = useStyles()
  const { priority, updateSettings } = useSettings()

  const onChangePriority = (event: ChangeEvent<HTMLInputElement>) => {
    const priority = (event.target as HTMLInputElement).value
    updateSettings({ priority: +priority as Priority })
  }

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">優先卓</FormLabel>
      <RadioGroup aria-label="priority" name="priority" value={priority} onChange={onChangePriority}>
        <FormControlLabel value={3} control={<Radio />} label="三麻" />
        <FormControlLabel value={4} control={<Radio />} label="四麻" />
      </RadioGroup>
    </FormControl>
  )
}

export default StepOther
