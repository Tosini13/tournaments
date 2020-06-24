import React, { Component } from 'react'

class TournamentNav extends Component {
    render() {
        return (
            <div className='tournament-nav'>
                <div className='tournament-nav-btn btn'>Teams</div>
                <div className='tournament-nav-btn btn'>Groups</div>
                <div className='tournament-nav-btn btn'>Play-offs</div>
            </div>
        )
    }
}

export default TournamentNav;