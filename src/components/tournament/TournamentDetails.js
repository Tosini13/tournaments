import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import TeamList from './teams/TeamList'
import Groups from './groups/Groups'
import Bracket from './bracket/Bracket'
import AddTeam from './create/AddTeam'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
class TournamentDetails extends Component {
    render() {
        const id = this.props.match.params.id
        const { tournament, teams, groups, bracket, auth } = this.props;
        if (tournament && groups && teams) {
            return (
                <div className='container tournament-details'>
                    <section className='tournament-description'>
                        <div className='title'>{tournament.name}</div>
                        <div className='tournament-date'>{moment(tournament.date.toDate()).format('yyyy MMMM DD')}</div>
                    </section>
                    <section className='tournament-dashboard'>
                        <div className='tournament-stages'>
                            <Groups tournamentId={id} groups={groups} auth={auth} />
                            {/* <Bracket bracket={bracket} /> */}
                        </div>
                        <div className='teams-dashboard'>
                            <TeamList tournamentId={id} teams={teams} control={(auth && (Boolean(groups) && !groups.length)) ? true : false} />
                            {(auth && groups.length == 0) ? <AddTeam tournamentId={id} /> : null}
                        </div>
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
    const tournament = tournaments ? tournaments[id] : null;
    const auth = state.firebase.auth.uid;
    return {
        tournament: tournament,
        teams: state.firestore.ordered.teams,
        groups: state.firestore.ordered.groups,
        bracket: null,
        auth
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