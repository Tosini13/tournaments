import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import TeamList from './teams/TeamList'
import Groups from './groups/Groups'
import Bracket from './bracket/Bracket'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
class TournamentDetails extends Component {
    render() {
        const id = this.props.match.params.id
        const { tournament, teams, groups, bracket } = this.props;
        if (tournament) {
            return (
                <div className='container tournament-details'>
                    <section className='tournament-description'>
                        <div className='title'>{tournament.name}</div>
                        <div className='tournament-date'>{moment(tournament.date.toDate()).format('yyyy MMMM DD')}</div>
                    </section>
                    <section className='tournament-dashboard'>
                        <div className='tournament-stages'>
                            <Groups tournamentId={id} groups={groups} />
                            {/* <Bracket bracket={bracket} /> */}
                        </div>
                        <TeamList tournamentId={id} teams={teams} />
                    </section>
                </div>
            )
        } else {
            return (
                <div>
                    Splash screen
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const tournaments = state.firestore.data.tournaments;
    let tournament = tournaments ? tournaments[id] : null;
    return {
        tournament: tournament,
        teams: state.firestore.ordered.teams,
        groups: state.firestore.ordered.groups,
        bracket: null
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            { collection: 'tournaments' },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'teams' }],
                storeAs: 'teams'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'groups' }],
                storeAs: 'groups'
            },
        ]
    })
)(TournamentDetails);