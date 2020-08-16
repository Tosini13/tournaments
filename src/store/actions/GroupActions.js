import firebase from 'firebase';

export const createGroupsToTournament = (tournamentId, groups) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        groups.forEach(item => {
            const group = {
                name: item.name,
                teams: item.teams,
                promoted: item.promoted,
                finishAt: item.finishAt,
                promotedQtt: item.promotedQtt
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


export const updateGroup = (tournamentId, groupId, group) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tournaments').doc(tournamentId).collection('groups').doc(groupId).update({
            ...group
        }).then(() => {
            dispatch({ type: 'EDIT_GROUP' });
        }).catch((err) => {
            dispatch({ type: 'EDIT_GROUP_ERROR', err });
        })
    }
}

export const deleteAllGroupsFromTournament = (tournamentId) => {

    console.log('group action delete');
    const path = `/tournaments/${tournamentId}/groups`;
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
        console.log(path);
        deleteFn({ path: path })
            .then(function (result) {
                dispatch({ type: 'DELETE_ALL_GROUPS_FROM_TOURNAMENT' })
                console.log('Delete success: ' + JSON.stringify(result));
            })
            .catch(function (err) {
                dispatch({ type: 'DELETE_ALL_GROUPS_FROM_TOURNAMENT_ERROR', err })
                console.log('Delete failed, see console,');
                console.log(err);
            });
    }
}