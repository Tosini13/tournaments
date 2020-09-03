import React from 'react'
import { colors } from '../../configureFiles/configStyle';
import { ButtonStyled } from '../style/styledButtons';

const Question = (props) => {
    const { question, ...answers } = props.question;
    const stylePopup = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        zIndex: '1000',
        backgroundColor: 'rgba(0,0,0,0.6)',
    }
    const styleQuestion = {
        backgroundColor: colors.primary.main,
        color: colors.secondary.main,
        padding: '15px 20px',
        width: 'fit-content',
        height: 'fit-content',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
        maxWidth: '90%',
        boxSizing: 'border-box'
    }
    const styleAnswers = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
    return (
        <div style={stylePopup}>
            <div style={styleQuestion}>
                <p>{question}</p>
                <div style={styleAnswers}>
                    {answers && Object.keys(answers).map(answer => {
                        return (
                            <ButtonStyled key={answer} onClick={answers[answer].feedback}>{answers[answer].answer}</ButtonStyled>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Question;