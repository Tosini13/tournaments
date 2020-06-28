import React from 'react'

const BracketChooseTeams = (props) => {

    const { teams, chosenTeams } = props;
    return (
        <div className='bracket-teams-list'>
            <div>
                {teams.map((team) => {
                    const order = chosenTeams.findIndex(id => id === team.id);
                    return (
                        <div key={team.id} className='bracket-team' onClick={() => { props.handleChooseTeam(team.id) }}>
                            {team.name}
                            {order > -1 ? <span className='bracket-team-order'>{order + 1}</span> : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BracketChooseTeams;