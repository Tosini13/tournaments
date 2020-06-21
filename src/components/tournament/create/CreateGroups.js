import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TeamList from '../teams/TeamList';
import { createGroups, createRandomGroups } from '../../../structures/Groups'
import GroupDetails from '../groups/GroupDetails';
import { createGroupsToTournament } from '../../../store/actions/GroupActions'


class CreateGroup extends Component {

    state = {
        groupQtt: 0,
        groups: null
    }

    handleDecline = () => {
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleAccept = () => {
        this.props.createGroupsToTournament(this.props.match.params.id, this.state.groups);
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleDraw = (teams) => {
        let groups = createRandomGroups(teams, this.state.groupQtt);
        if (groups) {
            this.setState({
                groups,
                groupQtt: this.state.groupQtt
            });
        }
    }

    handleAddGroup = (teams) => {
        let groups = createGroups(teams, this.state.groupQtt + 1);
        if (groups) {
            this.setState({
                groups,
                groupQtt: this.state.groupQtt + 1
            });
        }
    }

    handleRemoveGroup = (teams) => {
        let groups = createGroups(teams, this.state.groupQtt - 1);
        if (groups) {
            this.setState({
                groups,
                groupQtt: this.state.groupQtt - 1
            });
        }
    }

    render() {
        const { group, matches, teams } = this.props;

        if (teams) {
            return (
                <div className='groups'>
                    <div className='control-panel'>
                        <div className='btns'>
                            <div className='btns-main'>
                                <div className='btn btn-decline' onClick={this.handleDecline}>Decline</div>
                                <div className='btn btn-accept' onClick={this.handleAccept}>Accept</div>
                            </div>
                            <div className='btn' onClick={() => { this.handleAddGroup(teams) }}>add</div>
                            <div className='btn' onClick={() => { this.handleRemoveGroup(teams) }}>remove</div>
                            <div className='btn' onClick={() => { this.handleDraw(teams) }}>Draw</div>
                        </div>
                    </div>
                    <div className='group-list'>
                        {this.state.groups && this.state.groups.map(group => {
                            return <GroupDetails key={group.name} group={group} teams={teams.filter(team => group.teams.includes(team.id))} />
                        })}
                    </div>
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
    let teams = state.firestore.ordered.teams;
    return {
        teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGroupsToTournament: (tournamentId, groups) => dispatch(createGroupsToTournament(tournamentId, groups))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        return [{
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{ collection: 'teams' }],
            storeAs: 'teams'
        }]
    }
    ))(CreateGroup);