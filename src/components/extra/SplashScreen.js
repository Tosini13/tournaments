import React from 'react'

const SplashScreen = (props) => {
    const styleScreen = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0'
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
        backgroundColor: 'white',
    }
    const styleTrace = {
        display: 'block',
        height: '100%',
        width: '10px',
        borderLeft: 'red dashed 3px',
        position: 'absolute',
        top: '0',
        left: '64%'
    }
    const styleText = {
        display: 'block',
        color: '#019785',
        margin: '0',
    }
    return (
        <div className='splashScreen' style={styleScreen}>
            <div style={styleContainer}>
                <p style={styleText}>
                    MedL<span style={{ color: '#ad0707', margin: '0px 5px' }}></span>ne
                    <span style={styleTrace}></span>
                </p>
            </div>
        </div>
    )
}

export default SplashScreen;