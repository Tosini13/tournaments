import { matchModeConst } from "../../const/matchConst";

export class Match {
  home;
  away;
  placeholder;
  result;
  round;
  mode;

  homeScored = () => {
    if (this.mode === matchModeConst.live && this.result) {
      this.result.home++;
    }
  };

  awayScored = () => {
    if (this.mode === matchModeConst.live && this.result) {
      this.result.away++;
    }
  };

  homeResultLess = () => {
    if (
      this.mode === matchModeConst.live &&
      this.result &&
      this.result.home > 0
    ) {
      this.result.home--;
    }
  };

  awayResultLess = () => {
    if (
      this.mode === matchModeConst.live &&
      this.result &&
      this.result.away > 0
    ) {
      this.result.away--;
    }
  };

  finishMatch = () => {
    this.mode = matchModeConst.finished;
  };

  startMatch = () => {
    this.mode = matchModeConst.live;
    this.result = {
      home: 0,
      away: 0,
    };
  };

  continueMatch = () => {
    this.mode = matchModeConst.live;
    if (!this.result) {
      this.result = {
        home: 0,
        away: 0,
      };
    }
  };

  resetMatch = () => {
    this.mode = matchModeConst.notStarted;
    this.result = undefined;
  };

  constructor(round) {
    this.round = round;
    this.placeholder = {
      home: "no team",
      away: "no team",
    };
    this.mode = matchModeConst.notStarted;
  }
}