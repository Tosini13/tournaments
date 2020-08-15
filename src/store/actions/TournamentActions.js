import firebase from 'firebase';

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

    const path = `/tournaments/${tournamentId}`;
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
        console.log(path);
        deleteFn({ path: path })
            .then(function (result) {
                dispatch({ type: 'DELETE_TOURNAMENT' })
                console.log('Delete success: ' + JSON.stringify(result));
            })
            .catch(function (err) {
                dispatch({ type: 'DELETE_TOURNAMENT_ERROR', err })
                console.log('Delete failed, see console,');
                console.log(err);
            });
    }
}