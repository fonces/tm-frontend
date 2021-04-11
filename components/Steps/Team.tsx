import { memo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import useTeamUsers from '@/hooks/teamUsers'
import { User } from '@/stores/users/types'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    accordion: {
      padding: 0,
    },
    item: {
      padding: '8px 48px 8px 16px',
    },
  }),
)

type UserItemProps = User & Pick<ReturnType<typeof useTeamUsers>, 'onEntry'>
const UserItem = ({
  id,
  name,
  entry,
  onEntry,
}: UserItemProps) => {
  const classes = useStyles()
  const labelId = `user-checkbox-${id}`
  return (
    <ListItem key={id} button className={classes.item}>
    <ListItemText id={labelId} primary={name} />
    <ListItemSecondaryAction>
      <Checkbox
        edge="end"
        value={id}
        onChange={onEntry}
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

const StepTeam = () => {
  const classes = useStyles()
  const { teamUsers, onEntry } = useTeamUsers()

  return (
    <div className={classes.root}>
      {teamUsers.map(({ id, name, users }) => (
        <Accordion key={id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`summary-${id}`}
          >
            <Typography>{name}チーム</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordion}>
            <List dense className={classes.root}>
              {users.map((user) => <MemolizedUserItem key={user.id} {...user} onEntry={onEntry} />)}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default StepTeam
