import Match from 'Match'
import moment from 'moment';

export class DoubleMatch {

    set setDate(date) {
        if (moment(date).isValid()) {
            this.date = date
            return true;
        } else {
            return false;
        }
    }

    constructor(home, away, round) {
        this.date = null;
        this.firstMatch = new Match();
        this.secondMatch = new Match();
        this.result = {
            home: 0,
            away: 0
        }
        this.round = round;
    }
}