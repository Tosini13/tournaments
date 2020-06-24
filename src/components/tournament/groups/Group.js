import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import GroupTable from './GroupTable';

class Group extends Component {
    render() {
        const { group, matches, allTeams } = this.props;
        if (group && matches && allTeams) {
            const teams = allTeams.filter(team => group.teams.includes(team.id)); //withdraw only group's teams
            return (
                <div className='group container'>
                    <div className='btns'>
                        <div className='btn' onClick={() => {
                            this.props.history.push('/tournaments/' + this.props.match.params.id);
                        }}>Back to tournament</div>
                    </div>
                    <p className='title'>{group.name}</p>
                    <MatchesList matches={matches} teams={teams} tournamentId={this.props.match.params.id} groupId={this.props.match.params.groupId} />
                    <GroupTable matches={matches} teams={teams} />
                </div>
            )
        } else {
            return (
                <div>
                    Splash
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.groupId;
    let groups = state.firestore.data.groups;
    let group = groups ? groups[id] : null;
    return {
        group,
        allTeams: state.firestore.ordered.teams,
        matches: state.firestore.ordered.matches
    }
}

export default compose(
    connect(mapStateToProps),
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
                subcollections: [{
                    collection: 'groups',
                    doc: props.match.params.groupId,
                    subcollections: [{ collection: 'matches' }],
                }],
                storeAs: 'matches'
            }]
    }
    ))(Group);