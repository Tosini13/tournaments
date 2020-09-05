import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { updateBracketMatch } from '../../../store/actions/BracketAction'
import { changeMatchMode, addGoalMatch, lessGoalMatch } from '../../../structures/Groups';
import MatchDetails from './MatchDetails';
import Alert from '../../extra/Alert';

class MatchBracket extends Component {

    tournamentId = this.props.match.params.id;
    matchId = this.props.match.params.matchId;

    state = {
        updateMatchError: false
    }

    handleUpdateMatchMode = (match, mode) => {
        let editMatch = changeMatchMode(match, mode);
        if (editMatch) {
            this.props.updateBracketMatch(this.tournamentId, this.matchId, editMatch);
        } else {
            this.setState({
                updateMatchError: 'Drużyny nie zostały jeszcze przypisane do tego meczu'
            })
        }
    }

    onAlertClose = () => {
        this.setState({ updateMatchError: false })
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

    handleUpdateMatch = (match) => {
        this.props.updateBracketMatch(this.tournamentId, this.matchId, match);
    }

    render() {
        const { allTeams, theMatch, matches, groups } = this.props;
        return (
            <>
                <MatchDetails allTeams={allTeams} match={theMatch} handleUpdateMatchMode={this.handleUpdateMatchMode} matches={matches} groups={groups}
                    handleAddGoal={this.handleAddGoal} handleLessGoal={this.handleLessGoal} handleUpdateMatch={this.handleUpdateMatch}
                    historyPush={() => { this.props.history.push('/tournaments/' + this.tournamentId + '/bracket'); }} />
                {this.state.updateMatchError ? <Alert message={this.state.updateMatchError} open={Boolean(this.state.updateMatchError)} onClose={this.onAlertClose} severity="info" /> : null}
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.matchId;
    let bracket = state.firestore.data.bracket;
    let theMatch = bracket ? bracket[id] : null;
    return {
        theMatch,
        allTeams: state.firestore.ordered.teams,
        groups: state.firestore.ordered.groups,
        matches: state.firestore.ordered.bracket
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
                subcollections: [{ collection: 'groups' }],
                storeAs: 'groups'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'bracket', }],
                storeAs: 'bracket'
            }]
    }),
    connect(mapStateToProps, mapDispatchToProps))(MatchBracket);