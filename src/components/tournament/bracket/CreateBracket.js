import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import BracketChooseTeams from './BracketChooseTeams';
import { createBracketMatches, getFirstMatchTimeInBracket } from '../../../structures/Bracket';
import MatchesList from '../matches/MatchesList'
import { createBracket } from '../../../store/actions/BracketAction';
import { updateGroup } from '../../../store/actions/GroupActions';
import BracketChooseGroups from './BracketChooseGroups';
import { IconButtonStyled, ButtonStyled } from '../../style/styledButtons';
import { ClearIconStyled, DoneIconStyled } from '../../style/styledIcons';
import { changeMenu } from '../../../store/actions/MenuActions';
import { setBackBtn } from '../../../structures/extra';

const style = {
    select: {
        width: '100%',
        margin: '15px 0px',
    },
    autoButton: {
        on: {
            backgroundColor: 'darkgoldenrod',
        }
    }
}

class CreateBracket extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/tournaments/' + this.props.match.params.id);
        });
        this.props.changeMenu(null);
    }

    state = {
        bracketOrder: 0,
        matches: null,
        chosenItems: [],
        step: 'CHOOSE_TEAMS',
        groupsPromotedQtt: [],
        autoMode: false,
        roundQtt: 0,
    }

    handleDecline = () => {
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleAccept = (matches) => {
        this.props.createBracket(this.props.match.params.id, matches);
        this.props.groups.forEach(group => {
            const groupEdited = {
                ...group,
                promotedQtt: this.state.groupsPromotedQtt[group.id]
            }
            this.props.updateGroup(this.props.match.params.id, group.id, groupEdited);
        });
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleChooseTeam = (id) => {
        const chosenItems = this.saveTeamsChoose(id, this.state.chosenItems);
        this.setState({
            chosenItems
        })
    }


    handleChooseGroup = (groupPlaceholder, group) => {
        const newState = this.saveGroupChoose(groupPlaceholder, group, this.state.chosenItems, this.state.groupsPromotedQtt);
        this.setState({
            chosenItems: newState.chosenItems,
            groupsPromotedQtt: newState.groupsPromotedQtt
        })
    }

    handleSelectChange = (event) => {
        const roundQtt = event.target.value;

        if (this.props.groups && this.props.groups.length) {
            const newState = this.chooseGroupAuto(this.props.groups, roundQtt);
            this.setState({
                chosenItems: newState.chosenItems,
                groupsPromotedQtt: newState.groupsPromotedQtt,
                roundQtt
            })
        } else {
            const chosenItems = this.chooseTeamsAuto(roundQtt);
            this.setState({
                chosenItems,
                roundQtt
            })
        }
    };

    saveTeamsChoose = (id, chosenItemsState) => {
        let chosenItems;
        if (chosenItemsState.includes(id)) {
            chosenItems = chosenItemsState.filter(team => team !== id);
        } else {
            chosenItems = [...chosenItemsState, id];
        }
        return chosenItems;
    }

    chooseTeamsAuto = (roundQtt) => {
        let chosenItems = [];
        let roundQttIterator = 0;
        this.props.teams.forEach(team => {
            if (roundQttIterator < roundQtt * 2) {
                chosenItems = this.saveTeamsChoose(team.id, chosenItems);
                roundQttIterator++;
            }
        })
        return chosenItems;
    }

    chooseGroupAuto = (groups, roundQtt) => {
        let newState = {
            chosenItems: [],
            groupsPromotedQtt: []
        }
        let basket = [];
        let roundQttIterator = 0;
        for (let i = 0; i < groups[0].teams.length; i++) {
            if (roundQttIterator >= roundQtt * 2) break;
            for (let j = 0; j < groups.length; j++) {
                if (roundQttIterator >= roundQtt * 2) break;
                const groupPlaceholder = {
                    lastRound: groups[j].id,
                    place: i
                }
                basket.push({
                    groupPlaceholder,
                    group: groups[j]
                });
                roundQttIterator++;
            }
        }
        const centerIndex = Math.floor(basket.length / 2);
        for (let i = 0; i < centerIndex; i++) {
            let evenCounter = i;
            let oddCounter = basket.length - i - 1;
            //if the same group:
            if (basket[evenCounter].group.id === basket[oddCounter].group.id && this.props.groups.length !== 1) {
                let oddBasket = basket[oddCounter];
                basket[oddCounter] = basket[oddCounter - 1];
                basket[oddCounter - 1] = oddBasket;
            }
            newState = this.saveGroupChoose(basket[evenCounter].groupPlaceholder, basket[evenCounter].group, newState.chosenItems, newState.groupsPromotedQtt);
            newState = this.saveGroupChoose(basket[oddCounter].groupPlaceholder, basket[oddCounter].group, newState.chosenItems, newState.groupsPromotedQtt);
        }
        if (basket.length % 2 === 1) {
            newState = this.saveGroupChoose(basket[centerIndex].groupPlaceholder, basket[centerIndex].group, newState.chosenItems, newState.groupsPromotedQtt);
        }

        return newState;
    }


    saveGroupChoose = (groupPlaceholder, group, stateChosenItems, promotedQtt) => {
        let groupsPromotedQtt = promotedQtt;
        let chosenItems = stateChosenItems.filter(chosen => (chosen.lastRound !== groupPlaceholder.lastRound || chosen.place !== groupPlaceholder.place));
        if (chosenItems && chosenItems.length !== stateChosenItems.length) {
            if (groupsPromotedQtt[group.id]) {
                groupsPromotedQtt[group.id]--;
            }
        } else {
            if (groupsPromotedQtt[group.id]) {
                groupsPromotedQtt[group.id]++;
            } else {
                groupsPromotedQtt[group.id] = 1;
            }
            chosenItems = [...stateChosenItems, groupPlaceholder];
        }
        return {
            chosenItems,
            groupsPromotedQtt
        };
    }

    render() {
        const { teams, groups, tournament } = this.props;
        if (teams && groups && tournament) {
            let matches = null;
            if (groups && groups.length) {
                matches = createBracketMatches(teams, [], this.state.chosenItems, tournament, getFirstMatchTimeInBracket(groups), false);
            } else {
                matches = createBracketMatches(teams, this.state.chosenItems, [], tournament, tournament.date, false);
            }
            return (
                <div className='bracket'>
                    <div className='control-panel'>
                        <div className='btns'>
                            <IconButtonStyled onClick={this.handleDecline}><ClearIconStyled /></IconButtonStyled>
                            <ButtonStyled style={this.state.autoMode ? style.autoButton.on : null} onClick={() => { this.setState({ autoMode: !this.state.autoMode }) }}>AUTO</ButtonStyled>
                            <IconButtonStyled onClick={() => { this.handleAccept(matches) }}><DoneIconStyled /></IconButtonStyled>
                        </div>
                    </div>
                    {this.state.autoMode ?
                        <FormControl style={style.select}>
                            <InputLabel id="demo-simple-select-label">Wybierz ilość meczy:</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.roundQtt}
                                onChange={this.handleSelectChange}
                            >
                                <MenuItem value={1}>Finał</MenuItem>
                                <MenuItem value={2}>Finał, Półfinały</MenuItem>
                                <MenuItem value={4}>Finał, Półfinały, Ćwierćfinały</MenuItem>
                                <MenuItem value={8}>Finał, Półfinały, Ćwierćfinały, 1/16</MenuItem>
                            </Select>
                        </FormControl>
                        :
                        null
                    }
                    {groups && groups.length ?
                        <BracketChooseGroups groups={groups} chosenGroups={this.state.chosenItems} handleChooseGroup={this.handleChooseGroup} />
                        :
                        <BracketChooseTeams teams={teams} chosenTeams={this.state.chosenItems} handleChooseTeam={this.handleChooseTeam} />
                    }
                    <MatchesList teams={teams} matches={matches} groups={groups} />
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
    const tournament = state.firestore.ordered.tournaments ? state.firestore.ordered.tournaments.find(tournament => tournament.id === ownProps.match.params.id) : null;
    return {
        teams: state.firestore.ordered.teams,
        groups: state.firestore.ordered.groups,
        tournament
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBracket: (tournamentId, bracket) => dispatch(createBracket(tournamentId, bracket)),
        updateGroup: (tournamentId, groupId, group) => dispatch(updateGroup(tournamentId, groupId, group)),
        changeMenu: (menu) => dispatch(changeMenu(menu))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        return [
            {
                collection: 'tournaments'
            }, {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'teams', orderBy: ['name', 'asc'] }],
                storeAs: 'teams'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'groups', orderBy: ['name', 'asc'] }],
                storeAs: 'groups'
            }]
    }
    ))(CreateBracket);