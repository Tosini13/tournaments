import React from 'react'

import { ButtonStyled } from '../style/styledButtons';
import { DialogContentContainerStyled } from '../style/styledExtra';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const Question = (props) => {
    const { question, ...answers } = props.question;
    const { onClose, open } = props;

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContentContainerStyled>
                <DialogTitle id="simple-dialog-title">{question}</DialogTitle>
                <DialogActions>
                    {answers && Object.keys(answers).map(answer => {
                        return (
                            <ButtonStyled key={answer} onClick={answers[answer].feedback}>{answers[answer].answer}</ButtonStyled>
                        )
                    })}
                </DialogActions>
            </DialogContentContainerStyled>
        </Dialog>
    )
}

export default Question;