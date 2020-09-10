//groups can be null?
import moment from 'moment';

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

function initPromoted(groupName, teamsQtt) {
    let promoted = [];
    for (let i = 0; i < teamsQtt; i++) {
        promoted[i] = {
            name: groupName + ' - ' + (i + 1) + ' miejsce'
        }
    }
    return promoted;
}

export const createRandomGroups = (teams, groupsQtt, tournament, returnGames) => {
    return createGroupsAuto(shuffle(teams), groupsQtt, tournament, returnGames);
}

const setMatchesTime = (tournament, groups) => {
    const timeUnit = parseFloat(tournament.matchTimeInBracket) + parseFloat(tournament.breakTimeInBracket);
    let timeCounter = tournament.date;
    let timeTeamsCounter = [];
    let matchesQtt = 0;
    groups.forEach(group => {
        if (matchesQtt < group.matches.length) {
            matchesQtt = group.matches.length;
        }
    })

    let fieldCounter = 1;
    for (let i = 0; i < (matchesQtt + 1); i++) {
        for (let j = 0; j < groups.length; j++) {
            if (i < groups[j].matches.length) {
                if (timeTeamsCounter.includes(groups[j].matches[i].home) || timeTeamsCounter.includes(groups[j].matches[i].away)) {
                    timeCounter = moment(timeCounter).add(timeUnit, 'minutes');
                    fieldCounter = 1;
                    timeTeamsCounter = [];
                }
                groups[j].matches[i].date = moment(timeCounter).format('YYYY-MM-DD HH:mm');
                timeTeamsCounter = [...timeTeamsCounter, groups[j].matches[i].home, groups[j].matches[i].away];
                if (!(fieldCounter % tournament.fields)) {
                    timeCounter = moment(timeCounter).add(timeUnit, 'minutes');
                    fieldCounter = 0;
                    timeTeamsCounter = [];
                }
                fieldCounter++;
            } else if (i === groups[j].matches.length && i !== 0) {
                groups[j].finishAt = moment(groups[j].matches[groups[j].matches.length - 1].date).add(timeUnit, 'minutes').format('YYYY-MM-DD HH:mm');
            }
        }
    }
    return groups;
}

export const createPromotionGroupTeams = (groups) => {
    groups.forEach(group => {
        group.promoted = initPromoted(group.name, group.teams.length)
    })
    return groups;
}

export const createGroups = (teams, groupsQtt) => {
    if (teams.length / groupsQtt < 2) {
        return false;
    } else if (groupsQtt < 1) {
        return false;
    }
    let groups = [];
    const teamsQtt = teams.length;
    let restTeams = 0; //in one group!
    let add = 0;
    if (groupsQtt !== 1) {
        restTeams = teamsQtt % groupsQtt;
    }
    for (let i = 0; i < groupsQtt; i++) {
        if (restTeams !== 0) {
            add = 1;
            restTeams--;
        } else {
            add = 0;
        }
        let teamsInGroup = Math.floor(teamsQtt / groupsQtt) + add;
        const groupName = 'Group ' + String.fromCharCode(65 + i);
        groups.push(
            {
                name: groupName,
                finishAt: null,
                teams: [],
                promoted: [],
                promotedQtt: 0,
                teamsQtt: teamsInGroup
            }
        );
    }
    return groups;
}

export const createGroupsAuto = (teams, groupsQtt, tournament, returnGames) => {
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
        const groupName = 'Group ' + String.fromCharCode(65 + i);
        groups.push(
            {
                name: groupName,
                teams: groupTeams,
                promoted: initPromoted(groupName, teamsInGroup),
                finishAt: null,
                matches: null,
                promotedQtt: 0
            }
        );
    }
    initGroupMatches(tournament, groups, teams, returnGames);
    return groups;
}

export const initGroupMatches = (tournament, groups, teams, returnGames) => {
    groups.forEach((group, i) => {
        const matches = createGroupMatches(group.teams, returnGames);
        matches.sort(compareMatches);
        group.matches = matches;
    })
    groups = setMatchesTime(tournament, groups);
    return groups;
}

const compareMatches = (match1, match2) => {
    return match1.round - match2.round;
}

const initMatch = (home, away, round) => {
    return {
        home,
        away,
        mode: 'NOT_STARTED',
        result: {
            home: 0,
            away: 0
        },
        round
    }
}

const bergerAlgorithm = (teams) => {
    const isOdd = Boolean(teams.length % 2);
    const teamsQtt = isOdd ? teams.length + 1 : teams.length;
    const matchesInRound = teamsQtt / 2;
    const ghost = isOdd ? teams[teamsQtt - 2] : teams[teamsQtt - 1];
    let roundsQtt = 1;
    let matches = [];
    let hostTeams = teams.slice(0, teamsQtt / 2).reverse();
    let awayTeams = teams.slice(teamsQtt / 2, isOdd ? teamsQtt - 2 : teamsQtt - 1);
    while (roundsQtt < teamsQtt) {
        let newHost = [];
        let newAway = [];
        for (let i = 0; i < matchesInRound; i++) {
            let home = null;
            let away = null;
            if (i === 0 && roundsQtt % 2 === 0) {
                away = hostTeams.pop();
                home = ghost;
                newHost.push(away);
            } else if (i === 0 && roundsQtt % 2 === 1) {
                home = hostTeams.pop();
                away = ghost;
                newHost.push(home);
            } else {
                home = hostTeams.pop();
                away = awayTeams.pop();
                newHost.push(away);
                newAway.push(home);
            }
            if (home && away) {
                const match = initMatch(home, away, roundsQtt);
                matches.push(match);
            }
        }
        hostTeams = newHost;
        awayTeams = newAway;
        roundsQtt++;
    }
    return matches;
}

const createGroupMatches = (teams, returnGames) => {
    if (teams.length > 3) {
        return bergerAlgorithm(teams);
    } else if (teams.length === 3) {
        let matches = []
        matches.push(initMatch(teams[0], teams[1], 1));
        matches.push(initMatch(teams[1], teams[2], 2));
        matches.push(initMatch(teams[2], teams[0], 3));
        if (returnGames) {
            matches.push(initMatch(teams[1], teams[0], 4));
            matches.push(initMatch(teams[2], teams[1], 5));
            matches.push(initMatch(teams[0], teams[2], 6));
        }
        return matches;
    } else if (teams.length === 2) {
        let matches = [];
        matches.push(initMatch(teams[0], teams[1], 1));
        if (returnGames) {
            matches.push(initMatch(teams[0], teams[1], 1));
        }
        return matches;
    } else {
        return []
    }
}

// TABLE
const tableInit = (teams) => {
    let table = [];
    teams.forEach(team => {
        let row = {
            team: team,
            matches: 0,
            points: 0,
            goalsScored: 0,
            goalsLost: 0
        }
        table.push(row);
    })
    return table;
}

const sortTable = (a, b) => {
    //POINTS
    if (a.points === b.points) {
        //+/-
        let diffrenceA = a.goalsScored - a.goalsLost;
        let diffrenceB = b.goalsScored - b.goalsLost;
        if (diffrenceA === diffrenceB) {
            //SCORED
            if (a.goalsScored === b.goalsScored) {
                //LOST
                if (a.goalsLost === b.goalsLost) {
                    //TEAM NAME
                    // if (a.team.name.localeCompare(b.team.name) === 0) {
                    //     //ADD DIRECT RESULT!
                    //     return 0;
                    // }
                    // else {
                    //OR ASK ADMIN!!!
                    // return (a.team.name.localeCompare(b.team.name) < 0) ? -1 : 1;
                    // }
                    return 0;
                }
                else {
                    return (a.goalsLost > b.goalsLost) ? -1 : 1;
                }
            }
            else {
                return (a.goalsScored > b.goalsScored) ? -1 : 1;
            }
        }
        else {
            return (diffrenceA > diffrenceB) ? -1 : 1;
        }
    }
    else {
        return (a.points > b.points) ? -1 : 1;
    }
}

export const createTable = (teams, matches) => {
    let teamsId = teams.map(team => team.id);
    let table = tableInit(teamsId);
    let begunGroup = false; //check if group has begun


    for (let match of matches) {
        if (match.mode !== 'NOT_STARTED') {
            begunGroup = true;
            for (let row of table) {
                if (row.points == null) {
                    console.log("Matches didn't start!!");
                }
                //team is host
                if (match.home === row.team) {
                    //add points
                    if (match.result.home > match.result.away) {
                        row.points += parseInt(3);
                    } else if (match.result.home === match.result.away) {
                        row.points += parseInt(1);
                    }
                    //goal balance
                    row.goalsScored += parseInt(match.result.home);
                    row.goalsLost += parseInt(match.result.away);
                    if (match.mode === 'LIVE') {
                        row.live = true;
                    }
                    row.matches++;
                }
                //team is guest
                if (match.away === row.team) {
                    //add points
                    if (match.result.home < match.result.away) {
                        row.points += parseInt(3);
                    } else if (match.result.home === match.result.away) {
                        row.points += parseInt(1);
                    }
                    //goal balance
                    row.goalsScored += parseInt(match.result.away);
                    row.goalsLost += parseInt(match.result.home);
                    if (match.mode === 'LIVE') {
                        row.live = true;
                    }
                    row.matches++;
                }
            }
        }
    }
    if (begunGroup) {
        table.sort(sortTable);
    }
    return table;
}

export const getPromoted = (teams, matches) => {
    const table = createTable(teams, matches);
    let promoted = [];
    table.forEach(row => {
        promoted.push(row.team);
    })
    return promoted;
}

export const initGroupPromoted = (group) => {
    const teamsQtt = group.teams.length;
    let promoted = [];
    for (let i = 0; i < teamsQtt; i++) {
        promoted.push({
            name: group.name + ' ' + (i + 1) + ' place'
        });
    }
    return promoted;
}

//MATCH
const resetMatch = (match) => {
    if (match.name) { //check if bracket or group!!
        return {
            ...match,
            promoted: [{
                name: match.name + ' winner'
            },
            {
                name: match.name + ' looser' //promoted to next round
            }],
            result: {
                home: 0,
                away: 0,
            }
        }
    } else {
        return {
            ...match,
            result: {
                home: 0,
                away: 0,
            }
        }
    }
}

const setPromotedMatch = (match) => {
    if (match.result.home > match.result.away) {
        return {
            ...match,
            promoted: [
                match.home ? match.home : match.placeholder.home,
                match.away ? match.away : match.placeholder.away
            ]
        }
    } else if (match.result.home < match.result.away) {
        return {
            ...match,
            promoted: [
                match.away ? match.away : match.placeholder.away,
                match.home ? match.home : match.placeholder.home
            ]
        }
    }
    return match;
}

export const changeMatchMode = (match, mode, matches) => {
    if (match.home || match.away) {
        let tempMatch = match;
        if (mode === 'NOT_STARTED') {
            tempMatch = resetMatch(tempMatch);

        }
        else if (mode === 'FINISHED') {
            console.log('finish it');
            tempMatch = setPromotedMatch(tempMatch);
        }
        const editMatch = {
            ...tempMatch,
            mode
        }
        return editMatch;
    }
    console.log('MATCH IS NOT INITIETD');
    return false;
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