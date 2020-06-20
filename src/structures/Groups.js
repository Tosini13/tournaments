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

export const createRandomGroups = (teams, groupQtt) => {
    return createGroups(shuffle(teams), groupQtt);
}

export const createGroups = (teams, groupQtt) => {
    if (Math.ceil(teams.length / 2) < groupQtt || groupQtt < 1) {
        return false;
    }
    const teamsInGroup = Math.ceil(teams.length / groupQtt);
    let groups = [];
    for (let i = 0; i < groupQtt; i++) {
        groups.push(
            {
                name: 'Group ' + String.fromCharCode(65 + i),
                teams: teams.slice(teamsInGroup * i, teamsInGroup * (i + 1))
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