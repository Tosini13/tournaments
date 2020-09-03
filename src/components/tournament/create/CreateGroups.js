import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createGroups, createRandomGroups, initGroupMatches } from '../../../structures/Groups'
import GroupDetails from '../groups/GroupDetails';
import { createGroupsToTournament } from '../../../store/actions/GroupActions'
import ChooseTeamsToGroup from '../groups/ChooseTeamsToGroup';
import { IconButtonStyled, ButtonStyled } from '../../style/styledButtons';
import { ClearIconStyled, DoneIconStyled, AddGoalIconStyled, LessGoalIconStyled, RandomIconStyled } from '../../style/styledIcons';
import { changeMenu } from '../../../store/actions/MenuActions';

class CreateGroup extends Component {

    componentDidMount() {
        this.props.changeMenu(null);
    }

    state = {
        chooseTeams: null,
        groupQtt: 0,
        groups: null,
    }

    handleDecline = () => {
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleAccept = () => {
        this.props.createGroupsToTournament(this.props.match.params.id, this.state.groups);
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleDraw = (teams) => {
        let groups = createRandomGroups(teams, this.state.groupQtt, this.props.tournament, false);
        if (groups) {
            this.setState({
                groups,
                groupQtt: this.state.groupQtt
            });
        }
    }

    handleAddGroup = (teams) => {
        const groups = createGroups(teams, this.state.groupQtt + 1);
        if (groups) {
            this.setState({
                groups,
                groupQtt: this.state.groupQtt + 1
            });
        }
    }

    handleRemoveGroup = (teams) => {
        const groups = createGroups(teams, this.state.groupQtt - 1);
        if (groups) {
            this.setState({
                groups,
                groupQtt: this.state.groupQtt - 1
            });
        }
    }

    handleAddTeamToGroup = (teamId) => {
        let groups = this.state.groups;
        if (groups[this.state.chooseTeams].teams.includes(teamId)) {
            groups[this.state.chooseTeams].teams = groups[this.state.chooseTeams].teams.filter(team => team !== teamId);
        } else if (groups[this.state.chooseTeams].teams.length === groups[this.state.chooseTeams].promoted.length) {
            return false;
        } else {
            groups[this.state.chooseTeams].teams.push(teamId);
        }
        this.setState({
            groups
        });
    }

    handleInitGroupMatches = () => {
        const groups = initGroupMatches(this.props.tournament, this.state.groups, this.props.teams, false);
        this.setState({
            groups
        })
    }


    render() {
        const { teams, tournament } = this.props;
        if (teams && tournament && this.state.chooseTeams === null) {
            return (
                <div className='groups'>
                    <div className='control-panel'>
                        <div className='btns'>
                            <div className='btns-main'>
                                <IconButtonStyled onClick={this.handleDecline}><ClearIconStyled /></IconButtonStyled>
                                <IconButtonStyled onClick={() => { if (this.state.groupQtt !== 0) this.handleAccept() }}><DoneIconStyled /></IconButtonStyled>
                            </div>
                            <IconButtonStyled onClick={() => { this.handleAddGroup(teams) }}>
                                <AddGoalIconStyled />
                            </IconButtonStyled>
                            <IconButtonStyled onClick={() => { this.handleRemoveGroup(teams) }}>
                                <LessGoalIconStyled />
                            </IconButtonStyled>
                            <IconButtonStyled onClick={() => { this.handleDraw(teams) }}>
                                <RandomIconStyled />
                            </IconButtonStyled>
                        </div>
                    </div>
                    <div className='group-list'>
                        {this.state.groups && this.state.groups.map((group, i) => {
                            return (
                                <div className='group' key={group.name}>
                                    <GroupDetails tournament={tournament} groupNum={i + 1} groupsQtt={this.state.groups.length} group={group} teams={teams.filter(team => group.teams.includes(team.id))} creation />
                                    <div className='btns'>
                                        <ButtonStyled onClick={() => {
                                            this.setState({ chooseTeams: i });
                                        }}>
                                            Add Teams
                                        </ButtonStyled>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        }
        else if (teams && tournament && this.state.chooseTeams !== null) {
            let chosenTeams = [];
            let theGroupChosenTeams = this.state.groups[this.state.chooseTeams].teams;
            this.state.groups.forEach(group => {
                chosenTeams = [...chosenTeams, ...group.teams];
            });
            return (<div>
                <div className='btns'>
                    <div className='btn btn-green btn-icon' onClick={() => {
                        this.handleInitGroupMatches();
                        this.setState({ chooseTeams: null })
                    }}><i className='icon-ok'></i></div>
                </div>
                <ChooseTeamsToGroup teams={teams} chosenTeams={chosenTeams} theGroupChosenTeams={theGroupChosenTeams} handleChooseTeam={this.handleAddTeamToGroup} />
            </div >)
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
    const teams = state.firestore.ordered.teams;
    const tournament = state.firestore.data.tournaments ? state.firestore.data.tournaments[ownProps.match.params.id] : null;
    return {
        teams,
        tournament,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGroupsToTournament: (tournamentId, groups) => dispatch(createGroupsToTournament(tournamentId, groups)),
        changeMenu: (menu) => dispatch(changeMenu(menu))
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