import React from 'react'


const Bracket = (props) => {
    if (props.bracket) {
        return (
            <div className='bracket-list'>
                <p className='title'>Groups</p>
                There's bracket already
            </div>
        )
    } else {
        return (
            <div className='add-bracket'>
                <div className='btn'>
                    Add Bracket
                </div>
            </div>
        )
    }
}

export default Bracket;