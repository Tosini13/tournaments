import React from 'react'

const ChooseTeamsToGroup = (props) => {

    const { teams, chosenTeams, theGroupChosenTeams } = props;

    const style = {
        theGroupTeam: {
            color: 'rgba(0, 0, 0, 0.6)'
        }
    }

    return (
        <div className='bracket-choose-list'>
            {teams.map((team) => {
                const theGroupChosen = theGroupChosenTeams.find(id => id === team.id);
                const chosen = theGroupChosen ? true : chosenTeams.find(id => id === team.id);
                return (
                    <div className='teams-choosing-board' key={team.id}>
                        <div className='bracket-choose' onClick={() => props.handleChooseTeam(team.id)} style={chosen ? style.theGroupTeam : null}>
                            <p className='bracket-choose-title'>{team.name}</p>
                            <span className='bracket-choose-order'>
                                {chosen ?
                                    theGroupChosen ?
                                        <i className='icon-minus'></i>
                                        :
                                        null
                                    :
                                    <i className='icon-plus'></i>
                                }
                            </span>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default ChooseTeamsToGroup;