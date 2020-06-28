import React, { Component } from 'react'
import Question from '../../extra/Question';
import MatchSummary from './MatchSummary';

class MatchDetails extends Component {

    state = {
        question: null
    }

    handleRestartMatch = (match, mode) => {
        this.setState({
            question: {
                question: 'Do you want to restart the match?',
                answer1: {
                    answer: 'Yes',
                    feedback: () => {
                        this.props.handleUpdateMatchMode(match, mode);
                        this.setState({ question: null });
                    }
                },
                answer2: {
                    answer: 'No',
                    feedback: () => {
                        this.setState({ question: null });
                    }
                }
            }
        });
    }

    render() {
        const { allTeams, match } = this.props;
        if (match && allTeams) {
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
                    <div className='btns'>
                        <div className='btn' onClick={this.props.historyPush}>Back</div>
                    </div>
                    <MatchSummary match={match} teams={allTeams} />
                    <div className='match-dashboard'>
                        <div className='score-dashboard'>
                            <div className='btn' id='home-add' onClick={() => { this.props.handleAddGoal(match, match.home); }}>+</div>
                            <div className='btn' id='home-less' onClick={() => { this.props.handleLessGoal(match, match.home); }}>-</div>
                            <div className='btn' id='away-less' onClick={() => { this.props.handleLessGoal(match, match.away); }}>-</div>
                            <div className='btn' id='away-add' onClick={() => { this.props.handleAddGoal(match, match.away); }}>+</div>
                        </div>
                        <div className='btn' onClick={() => {
                            if (updateMode === 'NOT_STARTED') {
                                this.handleRestartMatch(match, updateMode);
                            } else {
                                this.props.handleUpdateMatchMode(match, updateMode);
                            }
                        }}>{modeButton}</div>
                    </div>
                    {this.state.question ? <Question question={this.state.question} /> : null}
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

export default MatchDetails;