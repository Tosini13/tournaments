import moment from 'moment'
const max_teams_amount = 64;
const roundName = {
    1: "Finał",
    2: "Półfinał",
    4: "Ćwierćfinał",
    8: "1/16",
    16: "1/32",
    32: "1/64"
};

export const maxTeamsQtt = () => {
    return max_teams_amount;
}

const countRoundQtt = (teamsQtt) => {
    let i = 1;
    while (i < teamsQtt) {
        i *= 2;
    }
    return i / 2;
}

export const addRestTeams = (teams) => {
    let newTeams = [...teams];
    let i = 1;
    while (teams.length < i) {
        i *= 2;
    }
    for (let j = 0; j < i; j++) {
        newTeams = [...newTeams]
    }
    return newTeams;
}

//NEEDED?!?
export const createBracketStageMatches = (teams, returnGames) => {
    let getTeams = [...teams];
    const round = roundName[teams.length / 2];
    let matches = [];
    while (getTeams.length) {
        const match = {
            home: getTeams.shift(),
            away: getTeams.shift(),
            mode: 'NOT_STARTED',
            result: {
                home: 0,
                away: 0,
            },
            round,
        }
        matches.push(match);
    }

    return matches;
}

export const getFirstMatchTimeInBracket = (groups) => {
    let time = groups[0].finishAt;
    groups.forEach(group => {
        if (time < group.finishAt) {
            time = group.finishAt
        }
    })
    return time;
}

export const createBracketMatches = (teams, chosenTeams, groupsTeams, tournament, firstMatchTime, returnGames) => {
    const timeUnit = parseFloat(tournament.matchTimeInBracket) + parseFloat(tournament.breakTimeInBracket);
    let timeCounter = firstMatchTime;
    timeCounter = moment(timeCounter).subtract(timeUnit, 'minutes');
    let lastRoundMatches = []; //array to init matches
    let currentRoundMatches = [...groupsTeams]; //get matches to create whole bracket ! GET FROM GROUPS AS WELL
    let getChosenTeams = [...chosenTeams];
    let roundQtt = chosenTeams.length ? countRoundQtt(chosenTeams.length)
        : countRoundQtt(groupsTeams.length);
    let matches = [];
    while (roundQtt >= 1) {
        const round = roundName[roundQtt];
        console.log(round);
        lastRoundMatches = currentRoundMatches;
        currentRoundMatches = [];
        //DRAW lastRoundMatches if checked
        lastRoundMatches.forEach(match => console.log(match))
        let matchCounter = 0;
        for (let i = 0; i < roundQtt; i++) {
            let roundMatchName = roundQtt === 1 ? round : round + ' ' + (i + 1);
            if (!(matchCounter % tournament.fields)) {
                timeCounter = moment(timeCounter).add(timeUnit, 'minutes');
            }
            matchCounter++;
            const match = {
                home: (getChosenTeams && getChosenTeams.length) ? getChosenTeams.shift() : null,
                away: (getChosenTeams && getChosenTeams.length) ? getChosenTeams.shift() : null,
                mode: 'NOT_STARTED',
                result: {
                    home: 0,
                    away: 0,
                },
                promoted: [{
                    name: roundMatchName + ' - wygrany'
                },
                {
                    name: roundMatchName + ' - przegrany' //promoted to next round
                }],
                placeholder: {
                    home: (getChosenTeams && getChosenTeams.length) ? null
                        : ((lastRoundMatches && lastRoundMatches.length) ? lastRoundMatches.shift() : null),
                    away: (getChosenTeams && getChosenTeams.length) ? null
                        : ((lastRoundMatches && lastRoundMatches.length) ? lastRoundMatches.shift() : null),
                },
                name: roundMatchName,
                date: moment(timeCounter).format('YYYY-MM-DD HH:mm'),
            }
            currentRoundMatches.push({
                lastRound: roundMatchName,
                place: 0
            });
            matches.push(match);
        }
        roundQtt /= 2;
    }
    return matches;
}

//NEEDED?!?
export const initNextMatch = (team, matches) => {
    let roundQtt = matches.length;
    while (roundQtt >= 1) {
        const round = roundName[roundQtt];
        matches.forEach(match => {
            if (match.round === round) {
                if (match.home) {
                    match.home = team;
                } else if (match.away) {
                    match.away = team;
                }
            }
        });
        roundQtt /= 2;
    }
    return matches;
}

export const placeholderToName = (match, teams, groups, matches) => {
    let home = null;
    let away = null;
    if (match.placeholder) {
        if (match.placeholder.home) {
            let group = null;
            if (groups && groups.length) {
                group = groups.find(group => group.id === match.placeholder.home.lastRound);
            }
            if (group) {
                const team = teams.find(item => item.id === group.promoted[match.placeholder.home.place])
                home = team ? team : group.promoted[match.placeholder.home.place];
            } else {
                const theMatch = matches.find(item => item.name === match.placeholder.home.lastRound);
                if (theMatch) {
                    home = theMatch.promoted[match.placeholder.home.place];
                    const team = teams.find(item => item.id === home);
                    home = team ? team : home;
                } else {
                    home = {
                        name: 'unindetified'
                    }
                }
            }
        }
        if (match.placeholder.away) {
            let group = null;
            if (groups && groups.length) {
                group = groups.find(group => group.id === match.placeholder.away.lastRound);
            }
            if (group) {
                const team = teams.find(item => item.id === group.promoted[match.placeholder.away.place])
                away = team ? team : group.promoted[match.placeholder.away.place];
            } else {
                const theMatch = matches.find(item => item.name === match.placeholder.away.lastRound);
                if (theMatch) {
                    away = theMatch.promoted[match.placeholder.away.place];
                    const team = teams.find(item => item.id === away);
                    away = team ? team : away;
                } else {
                    home = {
                        away: 'unindetified'
                    }
                }
            }
        }
    }
    return {
        home,
        away
    }
}