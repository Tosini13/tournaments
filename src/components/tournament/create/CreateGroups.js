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
        const { teams } = this.props;

        if (teams) {
            return (
                <div className='groups container'>
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
                        {this.state.groups && this.state.groups.map(group => {
                            return <GroupDetails key={group.name} group={group} teams={teams.filter(team => group.teams.includes(team.id))} creation />
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