import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateBracketMatch } from '../../../store/actions/BracketAction'
import { changeMatchMode, addGoalMatch, lessGoalMatch } from '../../../structures/Groups';
import MatchDetails from './MatchDetails';

class MatchBracket extends Component {

    tournamentId = this.props.match.params.id;
    matchId = this.props.match.params.matchId;

    handleUpdateMatchMode = (match, mode) => {
        let editMatch = changeMatchMode(match, mode);
        if (editMatch) {
            this.props.updateBracketMatch(this.tournamentId, this.matchId, editMatch);
        }
    }

    handleAddGoal = (match, team) => {
        let editMatch = addGoalMatch(match, team);
        if (editMatch) {
            this.props.updateBracketMatch(this.tournamentId, this.matchId, editMatch);
        }
    }

    handleLessGoal = (match, team) => {
        let editMatch = lessGoalMatch(match, team);
        if (editMatch) {
            this.props.updateBracketMatch(this.tournamentId, this.matchId, editMatch);
        }
    }

    render() {
        console.log(this.props);
        const { allTeams, theMatch } = this.props;
        return (
            <MatchDetails allTeams={allTeams} match={theMatch} handleUpdateMatchMode={this.handleUpdateMatchMode}
                handleAddGoal={this.handleAddGoal} handleLessGoal={this.handleLessGoal}
                historyPush={() => { this.props.history.push('/tournaments/' + this.tournamentId + '/bracket'); }} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    let id = ownProps.match.params.matchId;
    let bracket = state.firestore.data.bracket;
    let theMatch = bracket ? bracket[id] : null;
    return {
        theMatch,
        allTeams: state.firestore.ordered.teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBracketMatch: (tournamentId, matchId, match) => dispatch(updateBracketMatch(tournamentId, matchId, match))
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
                subcollections: [{ collection: 'bracket', }],
                storeAs: 'bracket'
            }]
    }),
    connect(mapStateToProps, mapDispatchToProps))(MatchBracket);