import React from 'react';

import TeamList from '../teams/TeamList'
import AddTeam from '../create/AddTeam'
import { maxTeamsQtt } from "../../../structures/Bracket";

const TournamentDetailsTeams = ({ tournamentId, teams, isGroupCreated, auth }) => {
    return (
        <div className='teams-dashboard'>
            <TeamList tournamentId={tournamentId} teams={teams} deleteControl={isGroupCreated && auth} control={Boolean(auth)} />
            {(auth && isGroupCreated && (teams.length <= maxTeamsQtt())) ? <AddTeam tournamentId={tournamentId} /> : null}
        </div>
    );
}

export default TournamentDetailsTeams;