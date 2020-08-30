import React from 'react';

import { TournamentDashboardStyled, TournamentDashboardElementStyled } from '../../style/styledTournament'
import { tournamentView } from "../../../configureFiles/constants";

const TournamentDetailsNav = ({ handleChangeView, currentView }) => {

    return (
        <TournamentDashboardStyled>
            <TournamentDashboardElementStyled selected={currentView === tournamentView.info ? true : false}
                onClick={() => { handleChangeView(tournamentView.info) }}>
                Informacje
                    </TournamentDashboardElementStyled>
            <TournamentDashboardElementStyled selected={currentView === tournamentView.groups ? true : false}
                onClick={() => { handleChangeView(tournamentView.groups) }}>
                Faza grupowa
                    </TournamentDashboardElementStyled>
            <TournamentDashboardElementStyled selected={currentView === tournamentView.bracket ? true : false}
                onClick={() => { handleChangeView(tournamentView.bracket) }}>
                Faza pucharowa
            </TournamentDashboardElementStyled>
            <TournamentDashboardElementStyled selected={currentView === tournamentView.teams ? true : false}
                onClick={() => { handleChangeView(tournamentView.teams) }}>
                Zespoły
                    </TournamentDashboardElementStyled>
        </TournamentDashboardStyled>
    )
}

export default TournamentDetailsNav;