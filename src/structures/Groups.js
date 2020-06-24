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
    if (groupsQtt > teams.length) {
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