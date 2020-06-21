import React from 'react';
import Match from './Match.js'

const MatchesList = (props) => {
    const { matches, teams } = props;
    let i = 0;
    return (
        <div className='matches-list'>
            {matches && matches.map(match => {
                return (
                    <Match key={match.id ? match.id : i++} match={match} teams={teams} />
                )
            })}
        </div>
    )
}

export default MatchesList;