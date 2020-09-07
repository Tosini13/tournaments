import React, { Component } from 'react'

import SportsIcon from '@material-ui/icons/Sports';

import Question from '../../extra/Question';
import MatchSummary from './MatchSummary';
import { setBackBtn } from '../../../structures/extra';
import { IconButtonStyled, ButtonStyled } from '../../style/styledButtons';
import { AddGoalIconStyled, LessGoalIconStyled } from '../../style/styledIcons';
import { connect } from 'react-redux';
import { changeMenu } from '../../../store/actions/MenuActions';

class MatchDetails extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.historyPush();
        });
        this.props.changeMenu(null);
    }

    state = {
        question: null
    }

    handleRestartMatch = (match, mode) => {
        this.setState({
            question: {
                question: 'Czy na pewno chcesz zrestartować mecz?',
                answer1: {
                    answer: 'Tak',
                    feedback: () => {
                        this.props.handleUpdateMatchMode(match, mode);
                        this.setState({ question: null });
                    }
                },
                answer2: {
                    answer: 'Nie',
                    feedback: () => {
                        this.setState({ question: null });
                    }
                }
            }
        });
    }

    handleCloseQuestion = () => {
        this.setState({
            question: null
        })
    }

    render() {
        const { allTeams, match, groups, matches } = this.props;
        if (match && allTeams) {
            let updateMode = null;
            let modeButton = null;
            switch (match.mode) {
                case 'NOT_STARTED':
                    updateMode = 'LIVE';
                    modeButton = 'ROZPOCZNIJ';
                    break;
                case 'LIVE':
                    updateMode = 'FINISHED';
                    modeButton = 'ZAKOŃCZ';
                    break;
                case 'FINISHED':
                    updateMode = 'NOT_STARTED';
                    modeButton = 'ZRESETUJ';
                    break;
                default:
                    console.log('match mode error');
                    break;
            }
            return (
                <div className='match-details'>
                    <MatchSummary match={match} teams={allTeams} groups={groups} matches={matches} handleUpdateMatch={this.props.handleUpdateMatch} />
                    <div className='match-dashboard'>
                        <div className='score-dashboard'>
                            <IconButtonStyled id='home-add' onClick={() => { this.props.handleAddGoal(match, match.home); }}><AddGoalIconStyled /></IconButtonStyled>
                            <IconButtonStyled id='home-less' onClick={() => { this.props.handleLessGoal(match, match.home); }}><LessGoalIconStyled /></IconButtonStyled>
                            <IconButtonStyled id='away-less' onClick={() => { this.props.handleLessGoal(match, match.away); }}><LessGoalIconStyled /></IconButtonStyled>
                            <IconButtonStyled id='away-add' onClick={() => { this.props.handleAddGoal(match, match.away); }}><AddGoalIconStyled /></IconButtonStyled>
                        </div>
                        <ButtonStyled onClick={() => {
                            if (updateMode === 'NOT_STARTED') {
                                this.handleRestartMatch(match, updateMode);
                            } else {
                                this.props.handleUpdateMatchMode(match, updateMode);
                            }
                        }}><SportsIcon />{modeButton}</ButtonStyled>
                    </div>
                    {this.state.question ? <Question question={this.state.question} onClose={this.handleCloseQuestion} open={Boolean(this.state.question)} /> : null}
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

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: (menu) => dispatch(changeMenu(menu))
    }
}

export default connect(null, mapDispatchToProps)(MatchDetails);