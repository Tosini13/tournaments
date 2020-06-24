import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateMatch } from '../../../store/actions/MatchActions'
import { changeMatchMode, addGoalMatch, lessGoalMatch } from '../../../structures/Groups';

class MatchDetails extends Component {

    tournamentId = this.props.match.params.id;
    groupId = this.props.match.params.groupId;
    matchId = this.props.match.params.matchId;


    handleUpdateMatchMode = (match, mode) => {
        let editMatch = changeMatchMode(match, mode);
        if (editMatch) {
            this.props.updateMatch(this.tournamentId, this.groupId, this.matchId, editMatch);
        }
    }

    handleAddGoal = (match, team) => {
        let editMatch = addGoalMatch(match, team);
        if (editMatch) {
            this.props.updateMatch(this.tournamentId, this.groupId, this.matchId, editMatch);
        }
    }

    handleLessGoal = (match, team) => {
        let editMatch = lessGoalMatch(match, team);
        if (editMatch) {
            this.props.updateMatch(this.tournamentId, this.groupId, this.matchId, editMatch);
        }
    }

    render() {
        const { allTeams } = this.props;
        const match = this.props.theMatch;
        if (match && allTeams) {
            const home = allTeams.find(team => team.id === match.home);
            const away = allTeams.find(team => team.id === match.away);
            let matchClass = 'match';
            let updateMode = null;
            let modeButton = null;
            switch (match.mode) {
                case 'NOT_STARTED':
                    console.log('NOT_STARTED');
                    updateMode = 'LIVE';
                    modeButton = 'START';
                    break;
                case 'LIVE':
                    console.log('LIVE');
                    matchClass += ' match-live';
                    updateMode = 'FINISHED';
                    modeButton = 'FINISH';
                    break;
                case 'FINISHED':
                    updateMode = 'NOT_STARTED';
                    modeButton = 'RESTART';
                    break;
                default:
                    console.log('match mode error');
                    break;
            }

            return (
                <div className='match-details'>
                    <div className={matchClass}>
                        <div className='match-teams'>
                            <p>
                                {home.name}
                            </p>
                            <p>vs</p>
                            <p>
                                {away.name}
                            </p>
                        </div>
                        {(match.mode === 'NOT_STARTED') ?
                            <div className='match-result match-result-not-started'>
                                <div className='score'></div> : <div className='score'></div>
                            </div>
                            :
                            <div className='match-result'>
                                <div className='score'>{match.result.home}</div> : <div className='score'>{match.result.away}</div>
                            </div>
                        }
                    </div>
                    <div className='match-dashboard'>
                        <div className='score-dashboard'>
                            <div className='btn' id='home-add' onClick={() => { this.handleAddGoal(match, match.home); }}>+</div>
                            <div className='btn' id='home-less' onClick={() => { this.handleLessGoal(match, match.home); }}>-</div>
                            <div className='btn' id='away-less' onClick={() => { this.handleLessGoal(match, match.away); }}>-</div>
                            <div className='btn' id='away-add' onClick={() => { this.handleAddGoal(match, match.away); }}>+</div>
                        </div>
                        <div className='btn' onClick={() => { this.handleUpdateMatchMode(match, updateMode); }}>{modeButton}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Splash
                </div>
            )
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.matchId;
    let matches = state.firestore.data.matches;
    let theMatch = matches ? matches[id] : null;
    return {
        theMatch,
        allTeams: state.firestore.ordered.teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMatch: (tournamentId, groupId, matchId, match) => dispatch(updateMatch(tournamentId, groupId, matchId, match))
    }
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'teams' }],
                storeAs: 'teams'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{
                    collection: 'groups',
                    doc: props.match.params.groupId,
                    subcollections: [{ collection: 'matches' }],
                }],
                storeAs: 'matches'
            }]
    }),
    connect(mapStateToProps, mapDispatchToProps))(MatchDetails);