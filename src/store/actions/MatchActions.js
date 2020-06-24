export const updateMatch = (tournamentId, groupId, matchId, match) => {
    console.log('update Match');
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('groups').doc(groupId).collection('matches').doc(matchId).update({
            ...match
        }).then(() => {
            dispatch({ type: 'EDIT_MATCH' });
        }).catch((err) => {
            dispatch({ type: 'EDIT_MATCH_ERROR', err });
        })
    }
}
