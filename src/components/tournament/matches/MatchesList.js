import React from 'react';
import MatchSummary from './MatchSummary.js'

const MatchesList = (props) => {
    const { matches, teams } = props;
    let i = 0;
    return (
        <div className='matches-list'>
            {matches && matches.map(match => {
                return (
                    <MatchSummary key={match.id ? match.id : i++} match={match} teams={teams} tournamentId={props.tournamentId} groupId={props.groupId} />
                )
            })}
        </div>
    )
}

export default MatchesList;