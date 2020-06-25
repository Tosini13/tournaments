import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import TeamList from './teams/TeamList'
import GroupsDashboard from './groups/GroupsDashboard'
// import Bracket from './bracket/Bracket'
import AddTeam from './create/AddTeam'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import TournamentNav from "./TournamentNav";
class TournamentDetails extends Component {
    render() {
        const id = this.props.match.params.id
        const { tournament, teams, groups, auth } = this.props;
        if (tournament && groups && teams) {
            return (
                <div className='tournament-details'>
                    <section className='tournament-description'>
                        <div className='title'>{tournament.name}</div>
                        <div className='tournament-date'>{moment(tournament.date.toDate()).format('yyyy MMMM DD')}</div>
                    </section>
                    {/* <TournamentNav /> */}
                    <section className='tournament-dashboard'>
                        <div className='tournament-stages'>
                            <GroupsDashboard tournamentId={id} groups={groups} auth={auth} />
                            {/* <Bracket bracket={bracket} /> */}
                        </div>
                        <div className='teams-dashboard'>
                            <TeamList tournamentId={id} teams={teams} deleteControl={(Boolean(groups) && !groups.length)} control={Boolean(auth)} />
                            {(auth && groups.length === 0) ? <AddTeam tournamentId={id} /> : null}
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

// const mapDispatchToProps = (dispatch) => {
//     return{
//         deleteGroups:
//     }
// }

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            { collection: 'tournaments' },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'teams', orderBy: ['name', 'asc'] }],
                storeAs: 'teams'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'groups', orderBy: ['name', 'asc'] }],
                storeAs: 'groups'
            },
        ]
    })
)(TournamentDetails);