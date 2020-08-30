import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBracketFromTournament } from '../../../store/actions/BracketAction';

import { ButtoSuccessStyled, ButtoErrorStyled } from "../../style/styledButtons";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemLinkStyled, MainContainerStyled } from '../../style/styledLayouts';

const BracketDashboard = (props) => {
    const { bracket, auth, groupFinished } = props;
    if (Boolean(bracket) && bracket.length) {
        return (
            <MainContainerStyled>
                <ListItemLinkStyled to={'/tournaments/' + props.tournamentId + '/bracket'}>
                    Faza pucharowa
                </ListItemLinkStyled>
                <ButtoErrorStyled
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        props.deleteBracketFromTournament(props.tournamentId)
                    }}
                >USUŃ FAZĘ PUCHAROWĄ</ButtoErrorStyled>
            </MainContainerStyled>
        )
    }
    else if (groupFinished) {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Play-offs are not available, because group(s) are already finshed</p>
                <p className='title'>Faza pucharowa nie jest dostępna, ponieważ faza grupowa już się skończyła!</p>
            </div>
        )
    } else if (auth) {
        return (
            <div className='bracket-dashboard'>
                <Link to={'/tournaments/' + props.tournamentId + '/bracket/create'}>
                    <ButtoSuccessStyled startIcon={<AddIcon />}>Stwórz fazę pucharową</ButtoSuccessStyled>
                </Link>
            </div >
        )
    } else {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Faza pucharowa nie jest jeszcze dostępna!</p>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        deleteBracketFromTournament: (tournamentId) => dispatch(deleteBracketFromTournament(tournamentId))
    }
}

export default connect(null, mapStateToDispatch)(BracketDashboard);