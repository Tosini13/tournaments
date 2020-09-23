import { matchModeConst } from "../../const/matchConst";
import { Match } from "./matchModel";

export class Game {
  winnerMatch;
  loserMatch;
  previousMatchHome;
  previousMatchAway;
  round;
  match;
  returnMatch;

  set setWinnerMatch(winnerMatch) {
    this.winnerMatch = winnerMatch;
  }

  set setLoserMatch(loserMatch) {
    this.loserMatch = loserMatch;
  }

  set setPreviousMatchHome(previousMatchHome) {
    this.previousMatchHome = previousMatchHome;
    this.setHomeString(`${previousMatchHome.round}`);
  }

  set setPreviousMatchAway(previousMatchAway) {
    this.previousMatchAway = previousMatchAway;
    this.setAwayString(`${previousMatchAway.round}`);
  }

  setHomeString = (placeHolder) => {
    this.match.placeholder.home = placeHolder;
    if (this.returnMatch) {
      this.returnMatch.placeholder.away = placeHolder;
    }
  };

  setAwayString = (placeHolder) => {
    this.match.placeholder.away = placeHolder;
    if (this.returnMatch) {
      this.returnMatch.placeholder.home = placeHolder;
    }
  };

  isFinished = () => {
    let isFinished = this.match.mode === matchModeConst.finished;
    if (this.returnMatch && isFinished) {
      isFinished = this.returnMatch.mode === matchModeConst.finished;
    }
    if (isFinished && this.match.result) {
      if (this.match.result.home > this.match.result.away) {
        console.log(this.match.home?.name);
        if (this.winnerMatch?.previousMatchHome === this) {
          // this.winnerMatch.match.home = this.match.home;
        }
      } else {
        console.log(this.match.away?.name);
      }
    }
    return isFinished;
  };

  constructor(round, returnMatch) {
    this.round = round;
    this.match = new Match(this.round);
    if (returnMatch) {
      this.returnMatch = new Match(`${this.round} - returnMatch`);
    }
  }
}
