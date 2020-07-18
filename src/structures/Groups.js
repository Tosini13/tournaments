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
            name: groupName + ' - ' + (i + 1) + ' place'
        }
    }
    return promoted;
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
        const groupName = 'Group ' + String.fromCharCode(65 + i);
        groups.push(
            {
                name: groupName,
                teams: groupTeams,
                promoted: initPromoted(groupName, teamsInGroup),
            }
        );
    }
    return groups;
}

export const craeteGroupMatches = (teams, tournament, groupsQtt, groupNum, returnGames) => {
    const matchTime = tournament.matchTimeInGroup;
    const breakTime = tournament.breakTimeInGroup;
    let timeCounter = moment(tournament.date.toDate()).add(matchTime * groupNum + breakTime * groupNum, 'minutes');
    let matches = [];
    for (let i = 0; i < teams.length - 1; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            let match;
            match = {
                home: teams[i].id,
                away: teams[j].id,
                mode: 'NOT_STARTED',
                date: moment(timeCounter).format('YYYY-MM-DD HH:mm'),
                result: {
                    home: 0,
                    away: 0
                }
            }
            matches.push(match);
            timeCounter = moment(timeCounter).add(matchTime * groupsQtt  + breakTime * groupsQtt , 'minutes');
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
                    date: moment(timeCounter).format('YYYY-MM-DD HH:mm'),
                    result: {
                        home: 0,
                        away: 0
                    }
                }
                matches.push(match);
                timeCounter = moment(timeCounter).add(matchTime * groupsQtt + breakTime * groupsQtt, 'minutes');
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
                }
                //team is host
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
    console.log(match);
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