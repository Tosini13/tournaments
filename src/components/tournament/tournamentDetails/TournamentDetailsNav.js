import React, { Component } from 'react';

import { TournamentDashboardStyled, TournamentDashboardElementStyled } from '../../style/styledTournament'
import { TournamentViewConst } from "../../../configureFiles/constants";

class TournamentDetailsNav extends Component {

    render() {
        console.log(this.props);
        return (
            <TournamentDashboardStyled>
                <TournamentDashboardElementStyled selected={this.props.currentView === TournamentViewConst.info ? true : false}
                    onClick={() => { this.props.handleChangeView(TournamentViewConst.info) }}>
                    Informacje
                    </TournamentDashboardElementStyled>
                <TournamentDashboardElementStyled selected={this.props.currentView === TournamentViewConst.groups ? true : false}
                    onClick={() => { this.props.handleChangeView(TournamentViewConst.groups) }}>
                    Faza grupowa
                    </TournamentDashboardElementStyled>
                <TournamentDashboardElementStyled selected={this.props.currentView === TournamentViewConst.bracket ? true : false}
                    onClick={() => { this.props.handleChangeView(TournamentViewConst.bracket) }}>
                    Faza pucharowa
            </TournamentDashboardElementStyled>
                <TournamentDashboardElementStyled selected={this.props.currentView === TournamentViewConst.teams ? true : false}
                    onClick={() => { this.props.handleChangeView(TournamentViewConst.teams) }}>
                    Zespoły
                    </TournamentDashboardElementStyled>
            </TournamentDashboardStyled>
        )
    }
}

export default TournamentDetailsNav;