import React from 'react';
import { BracketRoundTitleStyled, BracketMatchTeamsContainerStyled, BracketMatchContainerStyled } from '../../style/styledBracket';

const MatchMock = ({ match, teams }) => {
    let i = 0;
    console.log(teams);
    const home = teams.find(team => team.id === match.home);
    const away = teams.find(team => team.id === match.away);
    return (
        <BracketMatchContainerStyled key={i++}>
            {match.round ? <BracketRoundTitleStyled>{match.round}</BracketRoundTitleStyled> : null}
            <BracketMatchTeamsContainerStyled>
                <p>
                    {home ? home.name : match.placeholder.home}
                </p>
                <p>vs</p>
                <p>
                    {away ? away.name : match.placeholder.away}
                </p>
            </BracketMatchTeamsContainerStyled>
        </BracketMatchContainerStyled>
    )
}

export default MatchMock;