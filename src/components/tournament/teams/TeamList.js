import React from 'react'


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
        </div>
    )
}

export default TeamList;