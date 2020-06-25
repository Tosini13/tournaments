import React from 'react'

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
        backgroundColor: 'transparent',
        zIndex: '3'
    }
    const styleQuestion = {
        backgroundColor: '#57370D',
        color: '#FFE998',
        padding: '15px 20px',
        width: 'fit-content',
        height: 'fit-content',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.8)'
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
                            <div key={answer} className='btn' onClick={answers[answer].feedback}>{answers[answer].answer}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Question;