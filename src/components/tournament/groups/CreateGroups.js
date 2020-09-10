import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createGroups, createRandomGroups, initGroupMatches, createPromotionGroupTeams } from '../../../structures/Groups'
import GroupDetails from './GroupDetails';
import { createGroupsToTournament } from '../../../store/actions/GroupActions'
import ChooseTeamsToGroup from './ChooseTeamsToGroup';
import { IconButtonStyled, ButtonStyled } from '../../style/styledButtons';
import { ClearIconStyled, DoneIconStyled, AddGoalIconStyled, LessGoalIconStyled, RandomIconStyled } from '../../style/styledIcons';
import { changeMenu } from '../../../store/actions/MenuActions';
import { setBackBtn } from '../../../structures/extra';
import ToggleReturnGames from './create/ToggleReturnGames';

class CreateGroup extends Component {

    componentDidMount() {
        setBackBtn(null);
        this.props.changeMenu(null);
    }

    state = {
        chooseTeams: null,
        groupQtt: 0,
        groups: null,
        returnMatches: false
    }

    handleDecline = () => {
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleAccept = () => {
        this.setState({
            groups: createPromotionGroupTeams(this.state.groups)
        })
        this.props.createGroupsToTournament(this.props.match.params.id, this.state.groups);
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleDraw = (teams) => {
        let groups = createRandomGroups(teams, this.state.groupQtt, this.props.tournament, this.state.returnMatches);
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
        let legacy = true;
        groups.forEach(el => {
            if (el !== groups[this.state.chooseTeams]) {
                if (el.teams.includes(teamId)) {
                    legacy = false;
                }
            }
        })
        if (!legacy) return false;
        if (groups[this.state.chooseTeams].teams.includes(teamId)) {
            groups[this.state.chooseTeams].teams = groups[this.state.chooseTeams].teams.filter(team => team !== teamId);
        } else if (groups[this.state.chooseTeams].teams.length >= groups[this.state.chooseTeams].teamsQtt) {
            return false;
        } else {
            groups[this.state.chooseTeams].teams = [...groups[this.state.chooseTeams].teams, teamId]
        }
        this.setState({
            groups
        });
    }

    handleInitGroupMatches = () => {
        const groups = initGroupMatches(this.props.tournament, this.state.groups, this.props.teams, this.state.returnMatches);
        this.setState({
            groups
        })
    }

    handleChangeReturnMatches = () => {
        if (this.state.groupQtt > 0) {
            const groups = initGroupMatches(this.props.tournament, this.state.groups, this.props.teams, !this.state.returnMatches);
            this.setState({
                returnMatches: !this.state.returnMatches,
                groups
            })
        } else {
            this.setState({
                returnMatches: !this.state.returnMatches
            })
        }

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
                        <div>
                            <ToggleReturnGames checked={this.state.returnMatches} setChecked={this.handleChangeReturnMatches} />
                        </div>
                    </div>
                    <div className='group-list'>
                        {this.state.groups && this.state.groups.map((group, i) => {
                            const chosenTeams = group.teams.map(groupTeam => teams.find(team => groupTeam === team.id));
                            return (
                                <div className='group' key={group.name}>
                                    <GroupDetails tournament={tournament} groupNum={i + 1} groupsQtt={this.state.groups.length} group={group} teams={chosenTeams} creation />
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
                    <IconButtonStyled onClick={() => {
                        this.handleInitGroupMatches();
                        this.setState({ chooseTeams: null })
                    }}>
                        <DoneIconStyled />
                    </IconButtonStyled>
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