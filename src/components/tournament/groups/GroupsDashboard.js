import React, { useState } from 'react'
import GroupsList from './GroupsList';
import { connect } from 'react-redux';
import { deleteAllGroupsFromTournament } from '../../../store/actions/GroupActions';

import { ButtonErrorStyled, ButtonSuccessStyled, LinkStyled } from "../../style/styledButtons";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';
import Question from '../../extra/Question';


const GroupsDashboard = (props) => {

    const { groups, bracket, auth, deleteAllGroupsFromTournament } = props;

    const [question, setQuestion] = useState(null)

    const handleDeleteTeamQuestion = () => {
        setQuestion({
            question: `Czy na pewno chcesz usunąć fazę grupową?`,
            answer1: {
                answer: 'Tak',
                feedback: () => {
                    deleteAllGroupsFromTournament(props.tournamentId)
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

    if (Boolean(groups) && groups.length) {
        return (
            <>
                <MainContainerStyled>
                    <MainContainerContentStyled>
                        <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
                    </MainContainerContentStyled>
                    {auth ?
                        <ButtonErrorStyled
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteTeamQuestion}
                        >USUŃ FAZĘ GRUPOWĄ</ButtonErrorStyled>
                        : null}
                </MainContainerStyled>
                {question ? <Question question={question} onClose={handleCloseQuestion} open={Boolean(question)} /> : null}
            </>
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
                    <ButtonSuccessStyled startIcon={<AddIcon />}>Stwórz fazę grupową</ButtonSuccessStyled>
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