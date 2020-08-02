import React, { Component } from "react";
import TournamentSummary from "../tournament/TournamentSummary";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { setBackBtn } from "../../structures/extra";
import moment from 'moment';

class Dashboard extends Component {
    componentDidMount() {
        setBackBtn();
    }

    state = {
        showDate: 'TODAY'
    }

    handleShow = (showDate) => {
        this.setState({
            showDate
        })
    }

    filterByDate = (tournaments) => {
        switch (this.state.showDate) {
            case 'LIVE':
                return tournaments.filter(tournament => moment(new Date()).isSame(tournament.date));
            case 'TODAY':
                return tournaments.filter(tournament => moment(new Date()).isSame(tournament.date, 'day'));
            case 'PAST':
                return tournaments.filter(tournament => moment(new Date()).isAfter(tournament.date, 'day'));
            case 'FUTURE':
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
                <div className='dashboard-container container'>
                    <ul className='dashboard-nav'>
                        <li onClick={() => { this.handleShow('LIVE') }}><a href='#Live'>Live</a></li>
                        <li onClick={() => { this.handleShow('TODAY') }}><a href='#Today'>Today</a></li>
                        <li onClick={() => { this.handleShow('PAST') }}><a href='#Past'>Past</a></li>
                        <li onClick={() => { this.handleShow('FUTURE') }}><a href='#Future'>Future</a></li>
                    </ul>

                    <div className='tournaments-list'>
                        {tournamentsFiltered && tournamentsFiltered.map(tournament => {
                            return (
                                <TournamentSummary key={tournament.id} tournament={tournament} />
                            )
                        })}
                    </div>
                </div>
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