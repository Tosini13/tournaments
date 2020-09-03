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
import { ButtoInfoStyled, ButtoSuccessStyled } from '../../style/styledButtons';
import { changeMenu } from '../../../store/actions/MenuActions';

class Group extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/tournaments/' + this.props.match.params.id);
        });
        this.props.changeMenu(null);
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

    render() {
        const { group, matches, allTeams } = this.props;
        if (group && matches && allTeams) {
            const teams = allTeams.filter(team => group.teams.includes(team.id)); //withdraw only group's teams
            return (
                <MainContainerStyled>
                    <MainContainerContentStyled>
                        <p className='title'>{group.name}</p>
                        <MatchesList matches={matches} teams={teams} tournamentId={this.tournamentId} groupId={this.groupId} />
                        <GroupTable matches={matches} teams={teams} promotedQtt={group.promotedQtt} />
                    </MainContainerContentStyled>
                    <div className='btns'>
                        {group.finished ?
                            <ButtoInfoStyled onClick={() => { this.handleContinueGroup(group) }}>Continue group</ButtoInfoStyled>
                            :
                            <ButtoSuccessStyled onClick={() => { this.handleFinishGroup(teams, matches) }}>finish group</ButtoSuccessStyled>
                        }

                    </div>
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
        updateGroup: (tournamentId, groupId, group) => dispatch(updateGroup(tournamentId, groupId, group)),
        changeMenu: (menu) => dispatch(changeMenu(menu))
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