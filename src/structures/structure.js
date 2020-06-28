class Tournament {
    name = null;
    firstRound = null;  //1-final;2-semi;4-quater;8-1/16;16-1/32

    /* #brackets fields */
    LastCountedPlace = null;    //i.e. 5th place match
    matchesBracket = [];        //to know id of the match (to/from DB)
    finalMatch = null;          //root - start bracket's chain !!!
    roundName = {
        1: "Finał",
        2: "Półfinał",
        4: "Ćwierćfinał",
        8: "1/16",
        16: "1/32"
    };
    returnGameBracket = {  //for every stage as well?
        1: false,
        2: false,
        4: false,
        8: false,
        16: false
    };

    //FUNCTIONS

    getAvailableStages() {
        let stages = [];
        let i = 1;
        for (let bracket in this.roundName) {
            if (i < this.firstRound * 2) {
                stages.push(bracket);
            }
            i *= 2;
        }
        return stages;
    }

    createWinnerBracket() {
        //FROM THE TOP
        let currentRound = [];   //array with plces for objects to join higher objects 
        this.finalMatch = new Bracket();
        currentRound.push(this.finalMatch);

        for (let i = 1; i < (this.firstRound * 2); i *= 2) {
            let nextRound = [];
            let countTeam = 1;
            let countMatch = 1;
            for (let roundPiece of currentRound) {
                if (i == 1) {
                    roundPiece.name = this.roundName[i];
                    roundPiece.round = i;
                } else {
                    roundPiece.name = this.roundName[i] + ' ' + (countMatch++);
                    roundPiece.round = i;
                }
                let home = null;
                let away = null;
                if (i < this.firstRound) {
                    home = new Team('Zwycięzca ' + this.roundName[i * 2] + ' ' + (countTeam++));
                    away = new Team('Zwycięzca ' + this.roundName[i * 2] + ' ' + (countTeam++));
                } else {
                    home = new Team('Z grup');
                    away = new Team('Z grup');
                }
                //no random bracket!
                roundPiece.teams.push(home);
                roundPiece.teams.push(away);
                roundPiece.createMatches(); //or in constructor?!?!
                // roundPiece.matches.push(new Match(home, away)); //no random bracket!
                // if (this.returnGameBracket[i]) {
                //     roundPiece.matches.push(new Match(away, home));
                // }
                console.log('matches: ' + roundPiece.matches[0].home.name);
                if (i < this.firstRound) {
                    let homeParent = new Bracket();
                    homeParent.nextStage['winner'] = roundPiece;
                    roundPiece.previousStage['home'] = homeParent;
                    nextRound.push(homeParent);
                    let awayParent = new Bracket();
                    awayParent.nextStage['winner'] = roundPiece;
                    roundPiece.previousStage['away'] = awayParent;
                    nextRound.push(awayParent);
                }
            }
            currentRound = nextRound;
        }
    }

    getWinnerBracket(higher) {  //pass final at first!
        let arr = [];
        arr.push(higher);
        if (typeof higher.previousStage['home'] !== 'undefined') {
            arr = arr.concat(this.getWinnerBracket(higher.previousStage['home']));
        }
        if (typeof higher.previousStage['away'] !== 'undefined') {
            arr = arr.concat(this.getWinnerBracket(higher.previousStage['away']));
        }
        return arr;
    }

    bracketFilter(arr, filter) {
        let filtered = [];
        for (let item of arr) {
            if (filter === 0 || item.round === filter) {
                filtered.push(item);
            }
        }
        return filtered;
    }

    constructor(firstRound, returnGameBracket) {
        this.returnGameBracket = returnGameBracket;
        this.firstRound = firstRound;
    }

    //temp

    showWinnerBracket(higher) {  //pass final previous stage at first!
        let arr = [];
        arr.push(higher);
        if (typeof higher.previousStage['home'] !== 'undefined') {
            arr = arr.concat(this.showWinnerBracket(higher.previousStage['home']));
        }
        if (typeof higher.previousStage['away'] !== 'undefined') {
            arr = arr.concat(this.showWinnerBracket(higher.previousStage['away']));
        }
        return arr;
    }
}

class Bracket {
    teams = [];         //0,1 push when should to be promoted
    round = null;       //1/2/4/8/16
    name = null;
    matches = [];       // if returnMatch
    nextStage = [];     //keys -> 'winner' and 'loser'; array of Brackets
    previousStage = []; //keys -> 'home' and 'away'; array of Brackets

    //giveWinner

    createMatches() {
        this.matches.push(new Match(this.teams[0], this.teams[1]));
        // console.log('druzyny:' + this.teams[0].name);
        // console.log('mecze:' + this.matches);
        //and returnMatch!!!
    }

    //NOT GOOD
    promoteTeams() {
        let result = 0;
        result = this.matches[0].result[0] - this.matches[0].result[1];
        if (typeof this.matches[1] !== "undefined") {
            result = this.matches[0].result[1] - this.matches[0].result[0];
        }
        let exists = false;
        if (result > 0) {
            for (let match of this.nextStage['winner'].matches) {
                this.nextStage['winner'].teams.pull();
                this.nextStage['winner'].teams.push(this.teams[0]);
            }
        } else {
            for (let match of this.nextStage['winner'].matches) {
                if (match == this.teams[1]) {
                    exists = true;
                }
            }
            this.nextStage['winner'].teams.pull();
            this.nextStage['winner'].teams.push(this.teams[1]);
        }
    }

    setHomePromoted() {
        let finished = true;
        let result = 0;
        if (typeof this.previousStage['home'] !== 'undefined') {
            let i = 0;
            for (let match of this.previousStage['home'].matches) {
                if (match.mode != 2) {
                    finished = false;
                } else {
                    if (i > 0) {
                        result = match.result.away - match.result.home;
                    } else {
                        result = match.result.home - match.result.away;
                    }
                }
                i++;
            }
            if (finished) {
                return
                //init home!
            }
        }
        return false;
        //or not init
    }

    lastMatchesDidFinished() {
        let finished = true;
        if (typeof this.previousStage['home'] !== 'undefined' && typeof this.previousStage['away'] !== 'undefined') {
            for (let key in this.previousStage) {
                for (let match of this.previousStage[key].matches) {
                    if (match.mode != 2) {
                        finished = false;
                    }
                }
            }
        } else {
            return true;
        }
        return finished;
    };

    constructor() {
        // this.nextStage['winner'] = null;
        // this.nextStage['loser'] = null;
        // this.previousStage['home'] = null;
        // this.previousStage['away'] = null;
    }
}

class Match {
    id;             //#bracket? but I have already keys in table!
    home = null;
    away = null;
    mode = 0; //0-not_tarted;1-started;2-finished
    result = {
        home: "",
        away: "",
    }; //[0]-home;[1]-away

    startMatch() {
        if (this.mode == 2) {
            //alert('ten mecz już się zakończył!');
            console.log('ten mecz już się zakończył!');
        } else {
            this.mode = 1;
            this.result.home = 0;
            this.result.away = 0;
        }
        return false;
    }

    endMatch() {
        if (this.mode == 0) {
            console.log('ten mecz jeszcze się nie rozpoczął!');
        } else {
            this.mode = 2;
        }
        return false;
    }

    constructor(home, away) {//home and away are teams!
        this.home = home;
        this.away = away;
        this.mode = 0;
    }
}

class Team {
    id;//?
    name;

    constructor(name) {
        this.name = name;
    }
}