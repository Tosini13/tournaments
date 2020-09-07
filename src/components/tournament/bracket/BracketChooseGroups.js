import React from 'react'

import { IconButtonStyled } from '../../style/styledButtons';
import { LessGoalIconStyled, AddGoalIconStyled } from '../../style/styledIcons';
import { ChooseTeamStyled, ChooseTeamIconContainerStyled, ChooseTeamNameStyled, ChooseTeamContainerStyled, ChooseTeamTitleStyled } from '../../style/styledBracket';

const BracketChooseGroups = (props) => {

    const { groups, chosenGroups } = props;
    return (
        <>
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
                    <ChooseTeamContainerStyled key={group.id} className='bracket-choose'>
                        <ChooseTeamTitleStyled>{group.name}</ChooseTeamTitleStyled>
                        <div className='bracket-choose-children'>{groupPlaces}</div>
                    </ChooseTeamContainerStyled>
                )
            })}
        </>
    )
}

export default BracketChooseGroups;