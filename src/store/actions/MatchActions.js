export const addMatch = (tournamentID, match) => {
    return {
        type: 'ADD_MATCH',
        tournamentID,
        match
    }
}