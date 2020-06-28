export const createTournament = (tournament) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        console.log(getState);
        // const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('tournaments').add({
            ...tournament,
            authorId: authorId
        }).then(() => {
            dispatch({ type: 'CREATE_TOURNAMENT', tournament })
        }).catch(err => {
            dispatch({ type: 'CREATE_TOURNAMENT_ERROR', err })
        })
    }
}

export const deleteTournament = (tournamentId) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).delete()
            .then(() => {
                dispatch({ type: 'DELETE_TOURNAMENT' })
            }).catch(err => {
                dispatch({ type: 'DELETE_TOURNAMENT_ERROR', err })
            })
    }
}