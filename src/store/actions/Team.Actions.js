export const addTeamToTournament = (tournamentId, team) => {
    return {
        type: 'ADD_TEAM_TO_TOURNAMENT',
        tournamentId,
        team
    }
}