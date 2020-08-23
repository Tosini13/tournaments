import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import TeamList from './teams/TeamList'
import GroupsDashboard from './groups/GroupsDashboard'
import BracketDashboard from './bracket/BracketDashboard'
import AddTeam from './create/AddTeam'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteTournament } from "../../store/actions/TournamentActions";
import Question from "../extra/Question";
import { maxTeamsQtt } from "../../structures/Bracket";
import { setBackBtn } from "../../structures/extra";

// import TournamentNav from "./TournamentNav";
class TournamentDetails extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/');
        });
    }

    state = {
        question: null
    }

    handleDeleteTournament = () => {
        this.setState({
            question: {
                question: 'Do you want to delete the tournament?',
                answer1: {
                    answer: 'Yes',
                    feedback: () => {
                        this.props.deleteTournament(this.props.match.params.id);
                        this.props.history.push('/');
                    }
                },
                answer2: {
                    answer: 'No',
                    feedback: () => {
                        this.setState({ question: null });
                    }
                }
            }
        });
    }

    render() {
        const id = this.props.match.params.id
        const { tournament, teams, groups, auth, bracket } = this.props;
        if (tournament && groups && teams) {
            let groupFinished = false;
            groups.forEach(group => {
                if (group.finished) {
                    groupFinished = true;
                }
            })
            return (
                <div className='tournament-details'>
                    <section className='tournament-description'>
                        <div className='title'>{tournament.name}</div>
                        <div className='tournament-date'>{moment(tournament.date).format('yyyy MMMM DD')}</div>
                    </section>
                    <section className='tournament-dashboard'>
                        <div className='tournament-stages'>
                            <GroupsDashboard tournamentId={id} groups={groups} bracket={Boolean(bracket) && bracket.length} auth={auth} />
                            <BracketDashboard tournamentId={id} bracket={bracket} auth={auth} groupFinished={groupFinished}/>
                        </div>
                        <div className='teams-dashboard'>
                            <TeamList tournamentId={id} teams={teams} deleteControl={(Boolean(groups) && !groups.length) && auth} control={Boolean(auth)} />
                            {(auth && groups.length === 0 && (teams.length <= maxTeamsQtt())) ? <AddTeam tournamentId={id} /> : null}
                        </div>
                    </section>
                    <div onClick={this.handleDeleteTournament} className='btn btn-red'>DELETE</div>
                    {this.state.question ? <Question question={this.state.question} /> : null}
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
        bracket: state.firestore.ordered.bracket,
        auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTournament: (tournamentId) => dispatch(deleteTournament(tournamentId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
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
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'bracket' }],
                storeAs: 'bracket'
            },
        ]
    })
)(TournamentDetails);