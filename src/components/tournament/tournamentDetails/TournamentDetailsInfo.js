import React from 'react';
import moment from 'moment'

import { TournamentDetailsInfoStyled, TournamentDetailsInfoTitleStyled, TournamentDetailsInfoContentStyled } from '../../style/styledTournament'

const TournamentDetailsInfo = (tournament) => {
    return (
        <>
            <TournamentDetailsInfoStyled>
                <TournamentDetailsInfoTitleStyled>Data:</TournamentDetailsInfoTitleStyled>
                <TournamentDetailsInfoContentStyled>{moment(tournament.date).format('yyyy MMMM DD')}</TournamentDetailsInfoContentStyled>
            </TournamentDetailsInfoStyled>
            <TournamentDetailsInfoStyled>
                <TournamentDetailsInfoTitleStyled>Godzina:</TournamentDetailsInfoTitleStyled>
                <TournamentDetailsInfoContentStyled>{moment(tournament.date).format('HH:mm')}</TournamentDetailsInfoContentStyled>
            </TournamentDetailsInfoStyled>
        </>
    );
}

export default TournamentDetailsInfo;