import { useState, useEffect } from 'react'
import getTeams from '@/pages/api/team/GET'
import { Team } from '@/pages/utils/teams'

export default function Home () {
  const [teams, setTeams] = useState<Team[]>([])
  useEffect(() => {
    getTeams().then(res => setTeams(res))
  }, [])

  return (
    <section>
      <p>[Your Self Introduction]</p>
      <p>
        (This is a sample website - you’ll be building a site like this in{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
      {teams.map((team, key1) => (
        <ul key={key1}>
          <li>{team.id}: {team.name}</li>
          <li>
            {team.users.map((user, key2) => (
              <ul key={key2}>
                <li>{user.id}: {user.name}</li>
              </ul>
            ))}
          </li>
        </ul>
      ))}
    </section>
  )
}
