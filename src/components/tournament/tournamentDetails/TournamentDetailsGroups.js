import React from 'react';

import GroupsDashboard from '../groups/GroupsDashboard'

const TournamentDetailsGroups = ({ tournamentId, groups, isBracketCreated, auth }) => {
    return (
        <div className='tournament-stages'>
            <GroupsDashboard tournamentId={tournamentId} groups={groups} bracket={isBracketCreated} auth={auth} />
        </div>
    );
}

export default TournamentDetailsGroups;