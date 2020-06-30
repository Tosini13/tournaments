const max_teams_amount = 64;
const roundName = {
    1: "Final",
    2: "Semi-final",
    4: "Quater-final",
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

//BRACKET
export const createBracketMatches = (teams, chosenTeams, groupsTeams, returnGames) => {
    let lastRoundMatches = []; //array to init matches

    let currentRoundMatches = [...groupsTeams]; //get matches to create whole bracket ! GET FROM GROUPS AS WELL
    let getChosenTeams = [...chosenTeams];
    let roundQtt = chosenTeams.length ? countRoundQtt(chosenTeams.length)
        : countRoundQtt(groupsTeams.length);
    let matches = [];
    while (roundQtt >= 1) {
        const round = roundName[roundQtt];
        lastRoundMatches = currentRoundMatches;
        currentRoundMatches = [];
        //DRAW lastRoundMatches if checked
        for (let i = 0; i < roundQtt; i++) {
            let roundMatchName = roundQtt === 1 ? round : round + ' ' + (i + 1);
            const match = {
                home: (getChosenTeams && getChosenTeams.length) ? getChosenTeams.shift() : null,
                away: (getChosenTeams && getChosenTeams.length) ? getChosenTeams.shift() : null,
                mode: 'NOT_STARTED',
                result: {
                    home: 0,
                    away: 0,
                },
                promoted: [{
                    name: roundMatchName + ' winner'
                },
                {
                    name: roundMatchName + ' looser' //promoted to next round
                }],
                placeholder: {
                    home: (getChosenTeams && getChosenTeams.length) ? null
                        : ((lastRoundMatches && lastRoundMatches.length) ? lastRoundMatches.shift() : null),
                    away: (getChosenTeams && getChosenTeams.length) ? null
                        : ((lastRoundMatches && lastRoundMatches.length) ? lastRoundMatches.shift() : null),
                },
                name: roundMatchName,
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
    console.log(matches);
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
                // console.log(group.teams); //temporarily as promotion teams!!!
                const team = teams.find(item => item.id === group.promoted[match.placeholder.home.place])
                // console.log(team.name);
                home = team ? team : group.promoted[match.placeholder.home.place];
            } else {
                // console.log(matches, match.placeholder.home);
                const theMatch = matches.find(item => item.name === match.placeholder.home.lastRound);
                // console.log(theMatch);
                if (theMatch) {
                    home = theMatch.promoted[match.placeholder.home.place];
                    const team = teams.find(item => item.id === home);
                    // if (team) {
                    //     console.log('HERE');
                    //     console.log(match);
                    //     console.log(home);
                    // }
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
                // console.log(group.teams); //temporarily as promotion teams!!!
                const team = teams.find(item => item.id === group.promoted[match.placeholder.away.place])
                // console.log(team.name);
                away = team ? team : group.promoted[match.placeholder.away.place];
            } else {
                const theMatch = matches.find(item => item.name === match.placeholder.away.lastRound);
                // console.log(theMatch);
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
    // console.log(home, away);
    return {
        home,
        away
    }
}