import React, { Component } from "react";
import TournamentSummary from "../tournament/TournamentSummary";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { setBackBtn } from "../../structures/extra";
import moment from 'moment';
import { timeRange } from "../../const";

import List from '@material-ui/core/List';

import { TournamentDashboardStyled, TournamentDashboardElementStyled } from '../style/styledTournament'

class Dashboard extends Component {
    componentDidMount() {
        setBackBtn();
    }

    state = {
        showDate: timeRange.today
    }



    handleShow = (showDate) => {
        this.setState({
            showDate
        })
    }

    filterByDate = (tournaments) => {
        switch (this.state.showDate) {
            case timeRange.live:
                return tournaments.filter(tournament => moment(new Date()).isSame(tournament.date));
            case timeRange.today:
                return tournaments.filter(tournament => moment(new Date()).isSame(tournament.date, 'day'));
            case timeRange.past:
                return tournaments.filter(tournament => moment(new Date()).isAfter(tournament.date, 'day'));
            case timeRange.future:
                return tournaments.filter(tournament => moment(new Date()).isBefore(tournament.date, 'day'));
            default:
                return tournaments;
        }
    }

    render() {
        const { tournaments } = this.props;
        if (tournaments && tournaments.length) {
            const tournamentsFiltered = this.filterByDate(tournaments);
            return (
                <div className='dashboard-container'>
                    <TournamentDashboardStyled className='dashboard-nav'>
                        <TournamentDashboardElementStyled current={this.state.showDate === timeRange.live ? true : false}
                            onClick={() => { this.handleShow(timeRange.live) }}>Live
                        </TournamentDashboardElementStyled>
                        <TournamentDashboardElementStyled
                            current={this.state.showDate === timeRange.today ? true : false}
                            onClick={() => { this.handleShow(timeRange.today) }}>
                            Today
                        </TournamentDashboardElementStyled>
                        <TournamentDashboardElementStyled
                            current={this.state.showDate === timeRange.past ? true : false}
                            onClick={() => { this.handleShow(timeRange.past) }}>
                            Past
                        </TournamentDashboardElementStyled>
                        <TournamentDashboardElementStyled current={this.state.showDate === timeRange.future ? true : false}
                            onClick={() => { this.handleShow(timeRange.future) }}>
                            Future
                        </TournamentDashboardElementStyled>
                    </TournamentDashboardStyled>

                    <List style={{ marginTop: '30px' }}>
                        {tournamentsFiltered && tournamentsFiltered.map(tournament => {
                            return (
                                <TournamentSummary key={tournament.id} tournament={tournament} />
                            )
                        })}
                    </List>
                </div >
            )
        } else {
            return (
                <div>Splash...</div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tournamentsMy: state.tournament.tournaments,
        tournaments: state.firestore.ordered.tournaments
    }
}

export default compose(connect(mapStateToProps),
    firestoreConnect(props => {
        return [
            {
                collection: 'tournaments', orderBy: ['date', 'desc'],
            }
        ]
    }))(Dashboard);