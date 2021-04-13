import { useMemo } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { PRIORITY_KANJI_MAP } from '@/helpers/consts'
import useMaker from '@/hooks/maker'
import useTeamUsers from '@/hooks/teamUsers'
import useSettings from '@/stores/settings'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      gridRowGap: theme.spacing(1),
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(2),
    },
  }),
)

const Confirm = () => {
  const classes = useStyles()
  const { users, tables } = useMaker()
  const { entryTeamUsers } = useTeamUsers()
  const { priority } = useSettings()

  const diceSorted = useMemo(() => entryTeamUsers.sort((a, b) => a.dice - b.dice), [entryTeamUsers])

  return (
    <div className={classes.root}>
      <Typography>参加者数 : {users.toLocaleString()}人</Typography>
      <div className={classes.list}>
        {entryTeamUsers.map(({ id, name, users }) => (
          <Typography key={id} variant="caption">{name}チーム : {users.length.toLocaleString()}人</Typography>
        ))}
      </div>
      <Typography>ダイス</Typography>
      <div className={classes.list}>
        {diceSorted.map(({ id, name, dice }) => (
          <Typography key={id} variant="caption">{name}チーム : {dice.toLocaleString()}</Typography>
        ))}
      </div>
      <Typography>優先卓 : {PRIORITY_KANJI_MAP[priority]}麻</Typography>
      <div className={classes.list}>
        <Typography variant="caption">三麻 : {tables[3]}卓</Typography>
        <Typography variant="caption">四麻 : {tables[4]}卓</Typography>
      </div>
    </div>
  )
}

export default Confirm
