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