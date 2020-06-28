import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import BracketChooseTeams from './BracketChooseTeams';
import { createBracketMatches } from '../../../structures/Bracket';
import MatchesList from '../matches/MatchesList'
import { createBracket } from '../../../store/actions/BracketAction';

class CreateBracket extends Component {

    state = {
        bracketOrder: 0,
        matches: null,
        chosenTeams: [],
        step: 'CHOOSE_TEAMS'
    }

    handleDecline = () => {
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleAccept = (matches) => {
        this.props.createBracket(this.props.match.params.id, matches);
        this.props.history.push('/tournaments/' + this.props.match.params.id);
    }

    handleChooseTeam = (id) => {
        if (this.state.chosenTeams.includes(id)) {
            let chosenTeams = this.state.chosenTeams.filter(team => team !== id);
            this.setState({
                chosenTeams
            })
        } else {
            this.setState({
                chosenTeams: [...this.state.chosenTeams, id]
            })
        }
    }

    render() {
        const { teams } = this.props;
        if (teams) {
            const matches = createBracketMatches(teams, this.state.chosenTeams, [], false);
            return (
                <div className='bracket'>
                    <div className='control-panel'>
                        <div className='btns'>
                            <div className='btn btn-red btn-icon' onClick={this.handleDecline}><i className='icon-cancel'></i></div>
                            <div className='btn btn-icon'
                            // onClick={() => { this.handleDraw(teams) }}
                            >
                                <i className='icon-arrows-cw'></i>
                            </div>
                            <div className='btn btn-green btn-icon' onClick={() => { this.handleAccept(matches) }}><i className='icon-ok'></i></div>
                        </div>
                    </div>
                    <BracketChooseTeams teams={teams} chosenTeams={this.state.chosenTeams} handleChooseTeam={this.handleChooseTeam} />
                    <MatchesList teams={teams} matches={matches} />
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
    let teams = state.firestore.ordered.teams;
    return {
        teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBracket: (tournamentId, bracket) => dispatch(createBracket(tournamentId, bracket))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        return [{
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{ collection: 'teams', orderBy: ['name', 'asc'] }],
            storeAs: 'teams'
        }]
    }
    ))(CreateBracket);