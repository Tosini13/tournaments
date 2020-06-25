import React from 'react'

const SplashScreen = (props) => {
    const styleScreen = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        backgroundColor: '#57370D',
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
        color: '#FFE998',
        margin: '0',
    }
    return (
        <div className='splashScreen' style={styleScreen}>
            <div style={styleContainer}>
                <p style={styleText}>
                    <i className='icon-trophy'></i>
                    {/* Tournaments */}
                </p>
            </div>
        </div>
    )
}

export default SplashScreen;