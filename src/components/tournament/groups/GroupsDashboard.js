import React from 'react'
import GroupsList from './GroupsList';
import { connect } from 'react-redux';
import { deleteAllGroupsFromTournament } from '../../../store/actions/GroupActions';

import { ButtoErrorStyled, ButtoSuccessStyled, LinkStyled } from "../../style/styledButtons";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';


const GroupsDashboard = (props) => {

    const { groups, bracket, auth } = props;
    if (Boolean(groups) && groups.length) {
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
                </MainContainerContentStyled>
                <ButtoErrorStyled
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        props.deleteAllGroupsFromTournament(props.tournamentId)
                    }}
                >USUŃ FAZĘ GRUPOWĄ</ButtoErrorStyled>
            </MainContainerStyled>
        )
    } else if (auth) {
        if (bracket) {
            return (
                <MainContainerStyled>
                    <p className='title'>Faza grupowa nie jest dostępna, ponieważ faza pucharowa jest już stworzona!</p>
                </MainContainerStyled>
            )
        }
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <p className='title'>Faza grupowa nie jest stworzona</p>
                </MainContainerContentStyled>
                <LinkStyled to={props.tournamentId + '/groups/create'}>
                    <ButtoSuccessStyled startIcon={<AddIcon />}>Stwórz fazę grupową</ButtoSuccessStyled>
                </LinkStyled>
            </MainContainerStyled>
        )
    } else {
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <p className='title'>Faza grupowa nie jest dostępna!</p>
                </MainContainerContentStyled>
            </MainContainerStyled>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        deleteAllGroupsFromTournament: (tournamentId) => dispatch(deleteAllGroupsFromTournament(tournamentId))
    }
}

export default connect(null, mapStateToDispatch)(GroupsDashboard);