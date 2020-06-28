// const max_teams_amount = 200;
const roundName = {
    1: "Final",
    2: "Semi-final",
    4: "Quater-final",
    8: "1/16",
    16: "1/32"
};

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

export const createBracketMatches = (teams, chosenTeams, groupsTeams, returnGames) => {
    let lastRoundMatches = []; //array to init matches
    let currentRoundMatches = groupsTeams; //get matches to create whole bracket ! GET FROM GROUPS AS WELL
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
                home: (getChosenTeams && getChosenTeams.length) ? getChosenTeams.shift()
                    : ((lastRoundMatches && lastRoundMatches.length) ? lastRoundMatches.shift() : null),
                away: (getChosenTeams && getChosenTeams.length) ? getChosenTeams.shift()
                    : ((lastRoundMatches && lastRoundMatches.length) ? lastRoundMatches.shift() : null),
                mode: 'NOT_STARTED',
                result: {
                    home: 0,
                    away: 0,
                },
                round: roundMatchName,
            }
            currentRoundMatches.push(roundMatchName);
            matches.push(match);
        }
        roundQtt /= 2;
    }
    return matches;
}

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