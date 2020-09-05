import React, { useState } from 'react'
import { connect } from 'react-redux';
import { deleteBracketFromTournament } from '../../../store/actions/BracketAction';

import { ButtonSuccessStyled, ButtonErrorStyled, LinkStyled } from "../../style/styledButtons";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemLinkStyled, MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';
import Question from '../../extra/Question';

const BracketDashboard = (props) => {
    const { bracket, auth, groupFinished, deleteBracketFromTournament } = props;

    const [question, setQuestion] = useState(null)

    const handleDeleteTeamQuestion = () => {
        setQuestion({
            question: `Czy na pewno chcesz usunąć fazę pucharową?`,
            answer1: {
                answer: 'Tak',
                feedback: () => {
                    deleteBracketFromTournament(props.tournamentId)
                }
            },
            answer2: {
                answer: 'Nie',
                feedback: () => {
                    setQuestion(null);
                }
            }
        });
    }

    const handleCloseQuestion = () => {
        setQuestion(null)
    }




    if (Boolean(bracket) && bracket.length) {
        return (
            <>
                <MainContainerStyled>
                    <MainContainerContentStyled>
                        <ListItemLinkStyled to={'/tournaments/' + props.tournamentId + '/bracket'}>
                            Faza pucharowa
                </ListItemLinkStyled>
                    </MainContainerContentStyled>
                    {auth ?
                        <ButtonErrorStyled
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteTeamQuestion}
                        >USUŃ FAZĘ PUCHAROWĄ</ButtonErrorStyled>
                        : null}
                </MainContainerStyled>
                {question ? <Question question={question} onClose={handleCloseQuestion} open={Boolean(question)} /> : null}
            </>
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
                    <ButtonSuccessStyled startIcon={<AddIcon />}>Stwórz fazę pucharową</ButtonSuccessStyled>
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