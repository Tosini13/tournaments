import React from 'react'

const SplashScreen = (props) => {
    const styleScreen = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        backgroundColor: 'darkslategrey',
    }
    const styleContainer = {
        position: 'absolute',
        fontSize: '40px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 20px',
    }
    const styleText = {
        display: 'block',
        color: 'grey',
        margin: '0',
    }
    return (
        <div className='splashScreen' style={styleScreen}>
            <div style={styleContainer}>
                <p style={styleText}>
                    Tournaments
                </p>
            </div>
        </div>
    )
}

export default SplashScreen;