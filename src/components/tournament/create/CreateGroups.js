import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
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
        const { teams, tournament } = this.props;
        if (teams && tournament) {
            return (
                <div className='groups'>
                    <div className='control-panel'>
                        <div className='btns'>
                            <div className='btns-main'>
                                <div className='btn btn-red btn-icon' onClick={this.handleDecline}><i className='icon-cancel'></i></div>
                                <div className='btn btn-green btn-icon' onClick={this.handleAccept}><i className='icon-ok'></i></div>
                            </div>
                            <div className='btn btn-icon' onClick={() => { this.handleAddGroup(teams) }}>
                                <i className='icon-plus'></i>
                            </div>
                            <div className='btn btn-icon' onClick={() => { this.handleRemoveGroup(teams) }}>
                                <i className='icon-minus'></i>
                            </div>
                            <div className='btn btn-icon' onClick={() => { this.handleDraw(teams) }}>
                                <i className='icon-arrows-cw'></i>
                            </div>
                        </div>
                    </div>
                    <div className='group-list'>
                        {this.state.groups && this.state.groups.map((group, i) => {
                            return <GroupDetails key={group.name} tournament={tournament} groupNum={i+1} groupsQtt={this.state.groups.length} group={group} teams={teams.filter(team => group.teams.includes(team.id))} creation />
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
    console.log(state);
    const teams = state.firestore.ordered.teams;
    const tournament = state.firestore.data.tournaments ? state.firestore.data.tournaments[ownProps.match.params.id] : null;
    return {
        teams,
        tournament,
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
            collection: 'tournaments'
        },
        {
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{ collection: 'teams' }],
            storeAs: 'teams'
        }]
    }
    ))(CreateGroup);