import React from 'react'

import { IconButtonStyled } from '../../style/styledButtons';
import { LessGoalIconStyled, AddGoalIconStyled } from '../../style/styledIcons';
import { ChooseTeamStyled, ChooseTeamIconContainerStyled, ChooseTeamNameStyled } from '../../style/styledBracket';

const BracketChooseGroups = (props) => {

    const { groups, chosenGroups } = props;
    return (
        <div className='bracket-choose-list'>
            {groups.map((group) => {
                const groupPlaces = group.teams.map((team, i) => {
                    let groupPlaceholder = {
                        lastRound: group.id,
                        place: i
                    }
                    let isChosen = false;
                    chosenGroups.forEach(chosen => {
                        if (chosen.lastRound === groupPlaceholder.lastRound && chosen.place === groupPlaceholder.place) {
                            isChosen = true;
                        }
                    });
                    return (
                        <ChooseTeamStyled key={i} isChosen={isChosen} onClick={() => {
                            props.handleChooseGroup(groupPlaceholder, group)
                        }}>
                            <ChooseTeamNameStyled>{(i + 1) + ' place'}</ChooseTeamNameStyled>
                            <ChooseTeamIconContainerStyled>
                                {isChosen ?
                                    <IconButtonStyled>
                                        <LessGoalIconStyled />
                                    </IconButtonStyled>
                                    :
                                    <IconButtonStyled>
                                        <AddGoalIconStyled />
                                    </IconButtonStyled>
                                }
                            </ChooseTeamIconContainerStyled>
                        </ChooseTeamStyled>
                    )
                })
                return (
                    <div key={group.id} className='bracket-choose'>
                        <p className='bracket-choose-title'>{group.name}</p>
                        <div className='bracket-choose-children'>{groupPlaces}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default BracketChooseGroups;