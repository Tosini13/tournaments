import firebase from 'firebase';

export const createTournament = (data) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        // const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        const tournament = {
            name: data.name,
            date: data.date,
            matchTimeInGroup: data.matchTimeInGroup,
            breakTimeInGroup: data.breakTimeInGroup,
            matchTimeInBracket: data.matchTimeInBracket,
            breakTimeInBracket: data.breakTimeInBracket,
            location: `${data.location.city} ${data.location.street} ${data.location.number}`,
            fields: data.fields,
            image: data.image ? data.image.name : null
        }

        firestore.collection('tournaments').add({
            ...tournament,
            authorId: authorId
        }).then((res) => {
            if (data.image) {
                const storageRef = firebase.storage().ref();
                const ref = storageRef.child(`images/${authorId}/${data.image.name}`);
                ref.put(data.image).then(res => dispatch({ type: 'CREATE_TOURNAMENT', tournament }));
            } else {
                dispatch({ type: 'CREATE_TOURNAMENT', tournament })
            }
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