import React, { useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { ButtonSuccessStyled, ButtonErrorStyled, LinkStyled } from "../../style/styledButtons";
import { ListItemLinkStyled, MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';
import Question from '../../extra/Question';
import { updateGroup } from '../../../store/actions/GroupActions';
import { deleteBracketFromTournament } from '../../../store/actions/BracketAction';

const BracketDashboard = (props) => {
    const { bracket, auth, groupFinished, deleteBracketFromTournament } = props;

    const [question, setQuestion] = useState(null)

    const handleDeleteTeamQuestion = () => {
        setQuestion({
            question: `Czy na pewno chcesz usunąć fazę pucharową?`,
            answer1: {
                answer: 'Tak',
                feedback: () => {
                    resetPromotedTeam();
                    deleteBracketFromTournament(props.tournamentId);
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

    const resetPromotedTeam = () => {
        props.groups.forEach(group => {
            const groupEdited = {
                ...group,
                promotedQtt: 0
            }
            props.updateGroup(props.tournamentId, group.id, groupEdited);
        });
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

const mapStateToProps = (state, ownProps) => {
    return {
        groups: state.firestore.ordered.groups,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBracketFromTournament: (tournamentId) => dispatch(deleteBracketFromTournament(tournamentId)),
        updateGroup: (tournamentId, groupId, group) => dispatch(updateGroup(tournamentId, groupId, group))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        return [
            {
                collection: 'tournaments',
                doc: props.tournamentId,
                subcollections: [{ collection: 'groups', orderBy: ['name', 'asc'] }],
                storeAs: 'groups'
            }]
    }
    ))(BracketDashboard);