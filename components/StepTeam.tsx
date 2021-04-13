import { ChangeEvent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'

import useTeamUsers from '@/hooks/teamUsers'
import UserItem from '@/components/ItemUser'
import useUsers from '@/stores/users'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    accordion: {
      padding: 0,
    },
  }),
)

const StepTeam = () => {
  const classes = useStyles()
  const { byId, updateUser } = useUsers()
  const { teamUsers } = useTeamUsers()
  
  const onChange = (event: ChangeEvent<HTMLInputElement>, entry: boolean) => {
    const id = event.currentTarget!.value
    updateUser({
      ...byId[id],
      entry,
    })
  }

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
              {users.map((user) => <UserItem key={user.id} {...user} onChange={onChange} />)}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default StepTeam
