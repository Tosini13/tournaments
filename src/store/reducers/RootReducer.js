import { combineReducers } from 'redux'
import tournamentReducer from './TournamentReducer'
import authReducer from './AuthReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
    tournament: tournamentReducer,
    auth: authReducer,
    firestore: firestoreReducer,
    firesbase: firebaseReducer,
});

export default rootReducer;