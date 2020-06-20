import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TeamList from '../teams/TeamList';
import { createGroups, createRandomGroups } from '../../../structures/Groups'
import GroupDetails from '../groups/GroupDetails';


class CreateGroup extends Component {

    state = {
        groupQtt: 0,
        groups: null
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
                    <div className='btns'>
                        <div className='btn' onClick={() => { this.handleAddGroup(teams) }}>add group</div>
                        <div className='btn' onClick={() => { this.handleRemoveGroup(teams) }}>remove group</div>
                        <div className='btn' onClick={() => { this.handleDraw(teams) }}>Draw teams</div>
                    </div>
                    <div className='group-list'>
                        {this.state.groups && this.state.groups.map(group => {
                            return <GroupDetails key={group.name} group={group} />
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
    // let id = ownProps.match.params.groupId;
    let teams = state.firestore.ordered.teams;
    // let group = groups ? groups[id] : null;
    return {
        teams,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        return [{
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{ collection: 'teams' }],
            storeAs: 'teams'
        }]
    }
    ))(CreateGroup);