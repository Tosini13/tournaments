const initState = {
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
}

const tournamentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TOURNAMENT':
            console.log('tournament created');
            return state;
        case 'CREATE_TOURNAMENT_ERROR':
            console.log('tournament creation error', action.err);
            return state;
        case 'ADD_TEAM_TO_TOURNAMENT':
            console.log('team added to tournament');
            return state;
        case 'ADD_TEAM_TO_TOURNAMENT_ERROR':
            console.log('team addition to tournament error', action.err);
            return state;
        default:
            return state;
    }
}

export default tournamentReducer;