import React from 'react'
import AddTeam from '../create/AddTeam'


const TeamList = (props) => {
    return (
        <div className='team-list z-depth-1'>
            <p className='title'>Teams</p>
            {props.teams && props.teams.map(team => {
                return (
                    <div key={team.name}>
                        <p>{team.name}</p>
                    </div>
                )
            })}
            {/* if admin */}
            {/* <AddTeam tournamentId={props.tournamentId} /> */}
        </div>
    )
}

export default TeamList;