import React from 'react'
import { IconButtonStyled } from '../../style/styledButtons';
import { LessGoalIconStyled, AddGoalIconStyled } from '../../style/styledIcons';

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
                            {chosen ?
                                theGroupChosen ?
                                    <IconButtonStyled>
                                        <LessGoalIconStyled />
                                    </IconButtonStyled>
                                    :
                                    null
                                :
                                <IconButtonStyled>
                                    <AddGoalIconStyled />
                                </IconButtonStyled>
                            }
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default ChooseTeamsToGroup;