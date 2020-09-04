import React from 'react'
import { connect } from 'react-redux';
import { deleteBracketFromTournament } from '../../../store/actions/BracketAction';

import { ButtoSuccessStyled, ButtoErrorStyled, LinkStyled } from "../../style/styledButtons";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemLinkStyled, MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';

const BracketDashboard = (props) => {
    const { bracket, auth, groupFinished } = props;
    if (Boolean(bracket) && bracket.length) {
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <ListItemLinkStyled to={'/tournaments/' + props.tournamentId + '/bracket'}>
                        Faza pucharowa
                </ListItemLinkStyled>
                </MainContainerContentStyled>
                {auth ?
                <ButtoErrorStyled
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        props.deleteBracketFromTournament(props.tournamentId)
                    }}
                >USUŃ FAZĘ PUCHAROWĄ</ButtoErrorStyled>
                : null}
            </MainContainerStyled>
        )
    }
    else if (groupFinished) {
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <p className='title'>Play-offs are not available, because group(s) are already finshed</p>
                    <p className='title'>Faza pucharowa nie jest dostępna, ponieważ faza grupowa już się skończyła!</p>
                </MainContainerContentStyled>
            </MainContainerStyled>
        )
    } else if (auth) {
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <p className='title'>Faza pucharowa nie jest stworzona</p>
                </MainContainerContentStyled>
                <LinkStyled to={'/tournaments/' + props.tournamentId + '/bracket/create'}>
                    <ButtoSuccessStyled startIcon={<AddIcon />}>Stwórz fazę pucharową</ButtoSuccessStyled>
                </LinkStyled>
            </MainContainerStyled>
        )
    } else {
        return (
            <MainContainerStyled>
                <MainContainerContentStyled>
                    <p className='title'>Faza pucharowa nie jest jeszcze dostępna!</p>
                </MainContainerContentStyled>
            </MainContainerStyled>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        deleteBracketFromTournament: (tournamentId) => dispatch(deleteBracketFromTournament(tournamentId))
    }
}

export default connect(null, mapStateToDispatch)(BracketDashboard);