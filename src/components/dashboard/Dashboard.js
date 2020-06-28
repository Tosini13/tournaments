import React, { Component } from "react";
import TournamentSummary from "../tournament/TournamentSummary";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Dashboard extends Component {
    render() {
        const { tournaments } = this.props;
        return (
            <div className='dashboard-container container'>
                <ul className='dashboard-nav'>
                    <li><a href='#Live'>Live</a></li>
                    <li><a href='#Today'>Today</a></li>
                    <li><a href='#Past'>Past</a></li>
                    <li><a href='#Future'>Future</a></li>
                </ul>
                <div className='tournaments-list'>
                    {tournaments && tournaments.map(tournament => {
                        return (
                            <TournamentSummary key={tournament.id} tournament={tournament} />
                        )
                    })}
                </div>
            </div>
        )
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
    // if (!props.auth.uid) return []
    return [
        {
            collection: 'tournaments', orderBy: ['date', 'desc'],
            // where: [['ownerId', '==', props.auth.uid]]
        }
    ]
}))(Dashboard);