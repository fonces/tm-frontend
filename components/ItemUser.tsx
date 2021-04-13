import { memo, useRef, ChangeEvent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import { User } from '@/stores/users/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(6),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
  }),
)

type UserItemProps = 
  User & {
    onChange: (event: ChangeEvent<HTMLInputElement>, entry: boolean) => void
  }

const UserItem = ({
  id,
  name,
  entry,
  onChange,
}: UserItemProps) => {
  const classes = useStyles()
  const checkboxRef = useRef<HTMLButtonElement>(null)
  const labelId = `user-checkbox-${id}`

  const captureEvent = () => {
    checkboxRef.current!.querySelector('input')?.click()
  }

  return (
    <ListItem button onClick={captureEvent} className={classes.root}>
      <ListItemText id={labelId} primary={name} />
      <ListItemSecondaryAction>
        <Checkbox
          ref={checkboxRef}
          edge="end"
          value={id}
          onChange={onChange}
          checked={entry}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}
const MemolizedUserItem = memo(
  UserItem,
  (prevProps, nextProps) => prevProps.entry === nextProps.entry,
)

export default MemolizedUserItem