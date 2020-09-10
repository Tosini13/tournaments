import React from 'react'

const SplashScreen = (props) => {
    const styleScreen = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
    }
    const styleContainer = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 0px',
        fontSize: '20px',
    }
    return (
        <div className='splash-screen' style={styleScreen}>
            <div style={styleContainer}>
                <p>
                    <i className='icon-trophy' style={{ fontSize: '100px' }}></i>
                </p>
                <p>Tournaments v1.10</p>
            </div>
        </div>
    )
}

export default SplashScreen;