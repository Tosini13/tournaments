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

export const deleteTeamFromTournament = (tournamentId, teamId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('teams').doc(teamId).delete()
            .then(() => {
                dispatch({ type: 'DELETE_TEAM_FROM_TOURNAMENT' });
            }).catch((err) => {
                dispatch({ type: 'DELETE_TEAM_FROM_TOURNAMENT_ERROR', err });
            })
    }
}

export const editTeamFromTournament = (tournamentId, teamId, team) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('teams').doc(teamId).update({
            ...team
        }).then(() => {
            dispatch({ type: 'EDIT_TEAM' });
        }).catch((err) => {
            dispatch({ type: 'EDIT_TEAM_ERROR', err });
        })
    }
}