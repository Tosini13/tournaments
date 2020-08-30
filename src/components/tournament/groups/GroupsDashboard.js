import React from 'react'
import { Link } from 'react-router-dom';
import GroupsList from './GroupsList';
import { connect } from 'react-redux';
import { deleteAllGroupsFromTournament } from '../../../store/actions/GroupActions';

import { ButtoErrorStyled, ButtoSuccessStyled } from "../../style/styledButtons";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { MainContainerStyled } from '../../style/styledLayouts';


const GroupsDashboard = (props) => {

    const { groups, bracket, auth } = props;
    if (Boolean(groups) && groups.length) {
        return (
            <MainContainerStyled>
                <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
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
                <div className='groups-dashboard'>
                    <p className='title'>Faza grupowa nie jest dostępna, ponieważ faza pucharowa jest już stworzona!</p>
                </div>
            )
        }
        return (
            <div className='groups-dashboard'>
                <Link to={props.tournamentId + '/groups/create'}>
                    <ButtoSuccessStyled startIcon={<AddIcon />}>Stwórz fazę grupową</ButtoSuccessStyled>
                </Link>
            </div>
        )
    } else {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Faza grupowa nie jest jeszcze dostępna!</p>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        deleteAllGroupsFromTournament: (tournamentId) => dispatch(deleteAllGroupsFromTournament(tournamentId))
    }
}

export default connect(null, mapStateToDispatch)(GroupsDashboard);