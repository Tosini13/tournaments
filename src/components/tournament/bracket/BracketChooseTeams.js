import React from 'react'

const BracketChooseTeams = (props) => {

    const { teams, chosenTeams } = props;
    return (
        <div className='bracket-choose-list'>
            {teams.map((team) => {
                const order = chosenTeams.findIndex(id => id === team.id);
                return (
                    <div key={team.id} className='bracket-choose' onClick={() => { props.handleChooseTeam(team.id) }}>
                        <p className='bracket-choose-title'>{team.name}</p>
                        {order > -1 ? <span className='bracket-choose-order'>{order + 1}</span> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default BracketChooseTeams;