import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateGroupMatch } from '../../../store/actions/GroupActions'
import { changeMatchMode, addGoalMatch, lessGoalMatch } from '../../../structures/Groups';
import MatchDetails from './MatchDetails';

class MatchGroup extends Component {

    tournamentId = this.props.match.params.id;
    groupId = this.props.match.params.groupId;
    matchId = this.props.match.params.matchId;

    handleUpdateMatchMode = (match, mode) => {
        let editMatch = changeMatchMode(match, mode);
        if (editMatch) {
            this.props.updateGroupMatch(this.tournamentId, this.groupId, this.matchId, editMatch);
        }
    }

    handleAddGoal = (match, team) => {
        let editMatch = addGoalMatch(match, team);
        if (editMatch) {
            this.props.updateGroupMatch(this.tournamentId, this.groupId, this.matchId, editMatch);
        }
    }

    handleLessGoal = (match, team) => {
        let editMatch = lessGoalMatch(match, team);
        if (editMatch) {
            this.props.updateGroupMatch(this.tournamentId, this.groupId, this.matchId, editMatch);
        }
    }

    render() {
        const { allTeams, theMatch } = this.props;
        return (
            <MatchDetails allTeams={allTeams} match={theMatch} handleUpdateMatchMode={this.handleUpdateMatchMode}
                handleAddGoal={this.handleAddGoal} handleLessGoal={this.handleLessGoal}
                historyPush={() => { this.props.history.push('/tournaments/' + this.tournamentId + '/groups/' + this.groupId); }} />
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.matchId;
    let matches = state.firestore.data.matches;
    let theMatch = matches ? matches[id] : null;
    return {
        theMatch,
        allTeams: state.firestore.ordered.teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGroupMatch: (tournamentId, groupId, matchId, match) => dispatch(updateGroupMatch(tournamentId, groupId, matchId, match))
    }
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'teams' }],
                storeAs: 'teams'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{
                    collection: 'groups',
                    doc: props.match.params.groupId,
                    subcollections: [{ collection: 'matches' }],
                }],
                storeAs: 'matches'
            }]
    }),
    connect(mapStateToProps, mapDispatchToProps))(MatchGroup);