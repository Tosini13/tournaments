import React from 'react';

import TeamList from '../teams/TeamList'
import AddTeam from '../teams/AddTeam'
import { maxTeamsQtt } from "../../../structures/Bracket";

const TournamentDetailsTeams = ({ tournamentId, teams, isGroupCreated, auth }) => {
    return (
        <>
            <TeamList tournamentId={tournamentId} teams={teams} deleteControl={isGroupCreated && auth} control={Boolean(auth)} />
            {(auth && isGroupCreated && (teams.length <= maxTeamsQtt())) ? <AddTeam tournamentId={tournamentId} /> : null}
        </>
    );
}

export default TournamentDetailsTeams;