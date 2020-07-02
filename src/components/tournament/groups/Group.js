import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import GroupTable from './GroupTable';
import { getPromoted, initGroupPromoted } from '../../../structures/Groups'
import { updateGroup } from '../../../store/actions/GroupActions';

class Group extends Component {

    tournamentId = this.props.match.params.id;
    groupId = this.props.match.params.groupId;

    handleFinishGroup = (teams, matches) => {
        const promoted = getPromoted(teams, matches);
        const group = {
            ...this.props.group,
            promoted,
            finished: true
        }
        this.props.updateGroup(this.tournamentId, this.groupId, group);
    }

    handleContinueGroup = (group) => {
        const promoted = initGroupPromoted(group);
        const groupUpdated = {
            ...this.props.group,
            promoted,
            finished: false
        }
        this.props.updateGroup(this.tournamentId, this.groupId, groupUpdated);
    }

    render() {
        const { group, matches, allTeams } = this.props;
        if (group && matches && allTeams) {
            const teams = allTeams.filter(team => group.teams.includes(team.id)); //withdraw only group's teams
            return (
                <div className='group'>
                    <div className='btns'>
                        <div className='btn' onClick={() => {
                            this.props.history.push('/tournaments/' + this.props.match.params.id);
                        }}>Back to tournament</div>
                        {group.finished ?
                            <p className='btn btn-blue' onClick={() => { this.handleContinueGroup(group) }}>Continue group</p>
                            :
                            <p className='btn btn-green' onClick={() => { this.handleFinishGroup(teams, matches) }}>finish group</p>
                        }

                    </div>
                    <p className='title'>{group.name}</p>
                    <MatchesList matches={matches} teams={teams} tournamentId={this.tournamentId} groupId={this.groupId} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateGroup: (tournamentId, groupId, group) => dispatch(updateGroup(tournamentId, groupId, group))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
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