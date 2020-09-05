import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import MatchesList from '../matches/MatchesList';
import GroupTable from './GroupTable';
import { getPromoted, initGroupPromoted } from '../../../structures/Groups'
import { updateGroup } from '../../../store/actions/GroupActions';
import { setBackBtn } from '../../../structures/extra';
import { MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';
import { ButtonInfoStyled, ButtonSuccessStyled } from '../../style/styledButtons';
import { changeMenu, changeMenuView } from '../../../store/actions/MenuActions';
import { MenuConst, GroupViewConst } from '../../../configureFiles/constants';

class Group extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/tournaments/' + this.props.match.params.id);
        });
        this.props.changeMenu(MenuConst.group);
        this.props.changeMenuView(GroupViewConst.table);
    }

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


    getView = (group, matches, teams) => {
        switch (this.props.menu.menuView) {
            case GroupViewConst.table:
                return <GroupTable matches={matches} teams={teams} promotedQtt={group.promotedQtt} />
            case GroupViewConst.matches:
                return <MatchesList matches={matches} teams={teams} tournamentId={this.tournamentId} groupId={this.groupId} />
            default: return null;
        }
    }

    render() {
        const { group, matches, allTeams, auth } = this.props;
        if (group && matches && allTeams) {
            const teams = allTeams.filter(team => group.teams.includes(team.id)); //withdraw only group's teams
            return (
                <MainContainerStyled>
                    <MainContainerContentStyled>
                        <p className='title'>{group.name}</p>
                        {this.getView(group, matches, teams)}
                    </MainContainerContentStyled>
                    {this.props.menu.menuView === GroupViewConst.table && auth ?
                        <div className='btns'>
                            {group.finished ?
                                <ButtonInfoStyled onClick={() => { this.handleContinueGroup(group) }}>Continue group</ButtonInfoStyled>
                                :
                                <ButtonSuccessStyled onClick={() => { this.handleFinishGroup(teams, matches) }}>finish group</ButtonSuccessStyled>
                            }

                        </div>
                        : null}
                </MainContainerStyled>
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
    const id = ownProps.match.params.groupId;
    const groups = state.firestore.data.groups;
    const group = groups ? groups[id] : null;
    const auth = state.firebase.auth.uid;
    return {
        menu: state.menu,
        group,
        allTeams: state.firestore.ordered.teams,
        matches: state.firestore.ordered.matches,
        auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGroup: (tournamentId, groupId, group) => dispatch(updateGroup(tournamentId, groupId, group)),
        changeMenu: (menu) => dispatch(changeMenu(menu)),
        changeMenuView: (menuView) => dispatch(changeMenuView(menuView))
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
                    subcollections: [{ collection: 'matches', orderBy: ['date', 'asc'] }],
                }],
                storeAs: 'matches'
            }]
    }
    ))(Group);