const initState = {};
const tournamentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TOURNAMENT':
            console.log('tournament created');
            return state;
        case 'CREATE_TOURNAMENT_ERROR':
            console.log('tournament creation error', action.err);
            return state;
        case 'DELETE_TOURNAMENT':
            console.log('tournament deleted');
            return state;
        case 'DELETE_TOURNAMENT_ERROR':
            console.log('tournament deletion error', action.err);
            return state;
        case 'ADD_TEAM_TO_TOURNAMENT':
            console.log('team added to tournament');
            return state;
        case 'ADD_TEAM_TO_TOURNAMENT_ERROR':
            console.log('team addition to tournament error', action.err);
            return state;
        case 'CREATE_GROUP':
            console.log('group created');
            return state;
        case 'CREATE_GROUP_ERROR':
            console.log('group creation error', action.err);
            return state;
        case 'DELETE_ALL_GROUPS_FROM_TOURNAMENT':
            console.log('DELETE_ALL_GROUPS_FROM_TOURNAMENT');
            return state;
        case 'DELETE_ALL_GROUPS_FROM_TOURNAMENT_ERROR':
            console.log('DELETE_ALL_GROUPS_FROM_TOURNAMENT_ERROR', action.err);
            return state;
        case 'CREATE_MATCHES_TO_GROUP':
            console.log('matches to group created');
            return state;
        case 'CREATE_MATCHES_TO_GROUP_ERROR':
            console.log('matches to group creation error', action.err);
            return state;
        case 'CREATE_BRACKET':
            console.log('bracket created');
            return state;
        case 'CREATE_BRACKET_ERROR':
            console.log('bracket creation error', action.err);
            return state;
        case 'DELETE_BRACKET_FROM_TOURNAMENT':
            console.log('DELETE_BRACKET_FROM_TOURNAMENT');
            return state;
        case 'DELETE_BRACKET_FROM_TOURNAMENT_ERROR':
            console.log('DELETE_BRACKET_FROM_TOURNAMENT_ERROR', action.err);
            return state;
        case 'DELETE_TEAM_FROM_TOURNAMENT':
            console.log('team deleted from tournament');
            return state;
        case 'DELETE_TEAM_FROM_TOURNAMENT_ERROR':
            console.log('team deletion from tournament error', action.err);
            return state;
        case 'EDIT_TEAM':
            console.log('team edited');
            return state;
        case 'EDIT_TEAM_ERROR':
            console.log('team edition error', action.err);
            return state;
        case 'EDIT_GROUP':
            console.log('group edited');
            return state;
        case 'EDIT_GROUP_ERROR':
            console.log('group edition error', action.err);
            return state;
        case 'EDIT_GROUP_MATCH':
            console.log('group match edited');
            return state;
        case 'EDIT_GROUP_MATCH_ERROR':
            console.log('group match edition error', action.err);
            return state;
        case 'EDIT_BRACKET_MATCH':
            console.log('bracket match edited');
            return state;
        case 'EDIT_BRACKET_MATCH_ERROR':
            console.log('bracket match edition error', action.err);
            return state;
        default:
            return state;
    }
}

export default tournamentReducer;


/*const initState = {
    tournaments: [
        {
            id: '1xd', title: 'Champions League', date: new Date(),
            teams: [{ name: 'Barca' }, { name: 'ManCity' }, { name: 'Juve' }],
            groups: {
                tables: [],
                matches: []
            },
            bracket: {

            }
        },
        {
            id: '2xdd', title: 'Europa League', date: new Date()
        },
        {
            id: '3xddd', title: 'La Liga', date: new Date(),
            teams: [{ id: '1', name: 'Barca' }, { id: '2', name: 'Real' }, { id: '3', name: 'Atletico' }],
            groups: {
                name: 'Group A',
                promoted: 2,
                tables: [],
                matches: [
                    { home: '1', away: '2', result: { home: 0, away: 0 }, mode: 'NOT_STARTED' },
                    { home: '2', away: '3', result: { home: 0, away: 0 }, mode: 'NOT_STARTED' },
                    { home: '3', away: '1', result: { home: 0, away: 0 }, mode: 'NOT_STARTED' }
                ]
            },
        }
    ]
} */