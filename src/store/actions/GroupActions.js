export const createGroupsToTournament = (tournamentId, groups) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        groups.forEach(item => {
            const group = {
                name: item.name,
                teams: item.teams
            };
            const matches = item.matches;
            firestore.collection('tournaments').doc(tournamentId).collection('groups').add({
                ...group
            }).then((res) => {
                dispatch({ type: 'CREATE_GROUP' });
                matches.forEach(match => {
                    firestore.collection('tournaments').doc(tournamentId).collection('groups').doc(res.id).collection('matches').add({
                        ...match
                    }).then(() => {
                        dispatch({ type: 'CREATE_MATCHES_TO_GROUP' });
                    }).catch((err) => {
                        dispatch({ type: 'CREATE_MATCHES_TO_GROUP_ERROR', err });
                    })
                })
            }).catch((err) => {
                dispatch({ type: 'CREATE_GROUP_ERROR', err });
            })
        })
    }
}

export const deleteGroupsFromTournament = (tournamentId, groups) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        groups.forEach(item => {
            const group = {
                name: item.name,
                teams: item.teams
            };
            const matches = item.matches;
            firestore.collection('tournaments').doc(tournamentId).collection('groups').add({
                ...group
            }).then((res) => {
                dispatch({ type: 'CREATE_GROUP' });
                matches.forEach(match => {
                    firestore.collection('tournaments').doc(tournamentId).collection('groups').doc(res.id).collection('matches').add({
                        ...match
                    }).then(() => {
                        dispatch({ type: 'CREATE_MATCHES_TO_GROUP' });
                    }).catch((err) => {
                        dispatch({ type: 'CREATE_MATCHES_TO_GROUP_ERROR', err });
                    })
                })
            }).catch((err) => {
                dispatch({ type: 'CREATE_GROUP_ERROR', err });
            })
        })
    }
}

export const updateGroupMatch = (tournamentId, groupId, matchId, match) => {
    console.log('update Match');
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('groups').doc(groupId).collection('matches').doc(matchId).update({
            ...match
        }).then(() => {
            dispatch({ type: 'EDIT_GROUP_MATCH' });
        }).catch((err) => {
            dispatch({ type: 'EDIT_GROUP_MATCH_ERROR', err });
        })
    }
}