import React, { Component } from 'react'
import MatchesList from '../matches/MatchesList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class BracketDetails extends Component {
    render() {
        const { groups, allTeams, bracket } = this.props;
        return (
            <div className='bracket'>
                <div className='btns'>
                    <div className='btn' onClick={() => {
                        this.props.history.push('/tournaments/' + this.props.match.params.id);
                    }}>Back to tournament</div>
                </div>
                <MatchesList matches={bracket} teams={allTeams} tournamentId={this.props.match.params.id} bracket />
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    let groups = state.firestore.data.groups;
    return {
        groups,
        allTeams: state.firestore.ordered.teams,
        bracket: state.firestore.ordered.bracket
    }
}

export default compose(firestoreConnect(props => {
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
            subcollections: [{ collection: 'bracket' }],
            storeAs: 'bracket'
        }]
}), connect(mapStateToProps))(BracketDetails);