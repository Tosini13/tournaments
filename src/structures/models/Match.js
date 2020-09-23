import moment from 'moment';

export class Match {

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
        this.home = home;
        this.away = away;
        this.result = {
            home: 0,
            away: 0
        }
        this.round = round;
    }
}