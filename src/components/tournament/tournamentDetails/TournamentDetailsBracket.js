import React from 'react';
import BracketDashboard from '../bracket/BracketDashboard';

const TournamentDetailsBracket = ({tournamentId, bracket, isGroupFinished, auth}) => {
    return (
        <div className='tournament-stages'>
            <BracketDashboard tournamentId={tournamentId} bracket={bracket} auth={auth} groupFinished={isGroupFinished} />
        </div>
    );
}

export default TournamentDetailsBracket;