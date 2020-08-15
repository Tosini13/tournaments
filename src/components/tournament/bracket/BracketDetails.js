import React, { Component } from 'react'
import MatchesList from '../matches/MatchesList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { setBackBtn } from '../../../structures/extra';

class BracketDetails extends Component {
    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/tournaments/' + this.props.match.params.id);
        });
    }
    render() {
        const { allTeams, bracket, groups } = this.props;
        return (
            <div className='bracket'>
                <div className='btns'>
                </div>
                <MatchesList matches={bracket} teams={allTeams} tournamentId={this.props.match.params.id} groups={groups} bracket />
            </div>
        )
    }
}

const mapStateToProps = (state, ownState) => {
    let groups = state.firestore.ordered.groups;
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
            subcollections: [{ collection: 'bracket', orderBy: [['date', 'asc'], ['name', 'desc']] }],
            storeAs: 'bracket'
        }]
}), connect(mapStateToProps))(BracketDetails);