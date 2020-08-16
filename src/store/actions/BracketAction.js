import firebase from 'firebase';

export const createBracket = (tournamentId, bracket) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        bracket.forEach(match => {
            firestore.collection('tournaments').doc(tournamentId).collection('bracket').add({
                ...match
            }).then(() => {
                dispatch({ type: 'CREATE_BRACKET' });
            }).catch((err) => {
                dispatch({ type: 'CREATE_BRACKET_ERROR', err });
            })
        })
    }
}

export const updateBracketMatch = (tournamentId, matchId, match) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('bracket').doc(matchId).update({
            ...match
        }).then(() => {
            dispatch({ type: 'EDIT_BRACKET_MATCH' });
        }).catch((err) => {
            dispatch({ type: 'EDIT_BRACKET_MATCH_ERROR', err });
        })
    }
}

export const deleteBracketFromTournament = (tournamentId) => {

    const path = `/tournaments/${tournamentId}/bracket`;
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
        deleteFn({ path: path })
            .then(function (result) {
                dispatch({ type: 'DELETE_BRACKET_FROM_TOURNAMENT' })
                console.log('Delete success: ' + JSON.stringify(result));
            })
            .catch(function (err) {
                dispatch({ type: 'DELETE_BRACKET_FROM_TOURNAMENT_ERROR', err })
                console.log('Delete failed, see console,');
                console.log(err);
            });
    }
}