import React from 'react';
import Match from './Match.js'

const MatchesList = (props) => {
    const { matches } = props;
    console.log(props);
    return (
        <div className='matches-list'>
            {matches && matches.map(match => {
                return (
                    <Match key={match.id} match={match} />
                )
            })}
        </div>
    )
}

export default MatchesList;