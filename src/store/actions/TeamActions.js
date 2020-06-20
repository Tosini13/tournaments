export const addTeamToTournament = (tournamentId, team) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('teams').add({
            ...team
        }).then(() => {
            dispatch({ type: 'ADD_TEAM_TO_TOURNAMENT' });
        }).catch((err) => {
            dispatch({ type: 'ADD_TEAM_TO_TOURNAMENT_ERROR', err });
        })
    }
}