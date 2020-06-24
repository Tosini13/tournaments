//groups can be null?
function shuffle(arr) {
    let indexes = [];
    let newArr = [];
    while (indexes.length < arr.length) {
        const j = Math.floor(Math.random() * (arr.length));
        if (!indexes.includes(j)) {
            indexes.push(j);
            newArr.push(arr[j]);
        }
    }
    return newArr;
}

export const createRandomGroups = (teams, groupsQtt) => {
    return createGroups(shuffle(teams), groupsQtt);
}

export const createGroups = (teams, groupsQtt) => {
    if (teams.length / groupsQtt < 2) {
        return false;
    }
    let teamsId = teams.map(team => team.id);
    let restTeams = 0; //in one group!
    let add = 0;
    const teamsQtt = teams.length;
    let groups = [];
    if (groupsQtt !== 1) {
        restTeams = teamsQtt % groupsQtt;
    }
    for (let i = 0; i < groupsQtt; i++) {
        //check if it will be the same amount of teams or not
        if (restTeams !== 0) {
            add = 1;
            restTeams--;
        } else {
            add = 0;
        }
        let teamsInGroup = Math.floor(teamsQtt / groupsQtt) + add;
        let groupTeams = [];
        for (let j = 0; j < teamsInGroup; j++) {
            groupTeams.push(teamsId.shift());
        }
        groups.push(
            {
                name: 'Group ' + String.fromCharCode(65 + i),
                teams: groupTeams
            }
        );
    }
    return groups;
}

export const craeteGroupMatches = (teams, returnGames) => {
    let matches = [];
    for (let i = 0; i < teams.length - 1; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            let match;
            match = {
                home: teams[i].id,
                away: teams[j].id,
                mode: 'NOT_STARTED',
                result: {
                    home: 0,
                    away: 0
                }
            }
            matches.push(match);
        }
    }
    if (returnGames) {
        for (let i = 0; i < teams.length - 1; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                let match;
                match = {
                    home: teams[i].id,
                    away: teams[j].id,
                    mode: 'NOT_STARTED',
                    result: {
                        home: 0,
                        away: 0
                    }
                }
                matches.push(match);
            }
        }
    }
    return matches;
}

// TABLE
const tableInit = (teams) => {
    let table = [];
    teams.forEach(team => {
        let row = {
            team: team,
            points: 0,
            goalsScored: 0,
            goalsLost: 0
        }
        table.push(row);
    })
    return table;
}

export const createTable = (teams, matches) => {
    let teamsId = teams.map(team => team.id);
    let table = tableInit(teamsId);

    return table;
}


//MATCH
const resetMatch = (match) => {
    const editMatch = {
        ...match,
        result: {
            home: 0,
            away: 0,
        }
    }
    return editMatch;
}

export const changeMatchMode = (match, mode) => {
    console.log(mode);
    let tempMatch = match;
    if (mode === 'NOT_STARTED') {
        tempMatch = resetMatch();
    }
    const editMatch = {
        ...tempMatch,
        mode
    }
    return editMatch;
}

export const addGoalMatch = (match, team) => {
    if (match.mode === 'LIVE') {
        if (match.home === team) {
            const editMatch = {
                ...match,
                result: {
                    home: match.result.home + 1,
                    away: match.result.away,
                }
            }
            return editMatch;
        } else if (match.away === team) {
            const editMatch = {
                ...match,
                result: {
                    home: match.result.home,
                    away: match.result.away + 1,
                }
            }
            return editMatch;
        } else {
            console.log('TEAM UNDENTIFIED');
            return false;
        }
    } else {
        console.log('MATCH IS NOT LIVE');
        return false;
    }
}

export const lessGoalMatch = (match, team) => {
    if (match.mode === 'LIVE') {
        if (match.home === team) {
            if (match.result.home > 0) {
                const editMatch = {
                    ...match,
                    result: {
                        home: match.result.home - 1,
                        away: match.result.away,
                    }
                }
                return editMatch;
            } else {
                console.log('CANNOT HAVE LESS THAN 0 SCORED');
                return false;
            }
        } else if (match.away === team) {
            if (match.result.away > 0) {
                const editMatch = {
                    ...match,
                    result: {
                        home: match.result.home,
                        away: match.result.away - 1,
                    }
                }
                return editMatch;
            } else {
                console.log('CANNOT HAVE LESS THAN 0 SCORED');
                return false;
            }
        } else {
            console.log('TEAM UNDENTIFIED');
            return false;
        }
    } else {
        console.log('MATCH IS NOT LIVE');
        return false;
    }
}