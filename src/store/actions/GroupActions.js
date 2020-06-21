export const createGroupsToTournament = (tournamentId, groups) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        groups.map(item => {
            const group = {
                name: item.name,
                teams: item.teams
            };
            const matches = item.matches;
            firestore.collection('tournaments').doc(tournamentId).collection('groups').add({
                ...group
            }).then((res) => {
                dispatch({ type: 'CREATE_GROUP' });
                matches.map(match => {
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