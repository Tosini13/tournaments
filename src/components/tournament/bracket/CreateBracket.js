import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import BracketChooseTeams from './BracketChooseTeams';
import { createBracketMatches } from '../../../structures/Bracket';
import MatchesList from '../matches/MatchesList'
import { createBracket } from '../../../store/actions/BracketAction';
import BracketChooseGroups from './BracketChooseGroups';

class CreateBracket extends Component {

    state = {
        bracketOrder: 0,
        matches: null,
        chosenItems: [],
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
        if (this.state.chosenItems.includes(id)) {
            let chosenItems = this.state.chosenItems.filter(team => team !== id);
            this.setState({
                chosenItems
            })
        } else {
            this.setState({
                chosenItems: [...this.state.chosenItems, id]
            })
        }
    }

    handleChooseGroup = (name) => {
        console.log(name);
        console.log(this.state.chosenItems);
        if (this.state.chosenItems.includes(name)) {
            let chosenItems = this.state.chosenItems.filter(team => team !== name);
            this.setState({
                chosenItems
            })
        } else {
            this.setState({
                chosenItems: [...this.state.chosenItems, name]
            })
        }
    }

    render() {
        const { teams, groups } = this.props;
        if (teams) {
            const matches = createBracketMatches(teams, this.state.chosenItems, [], false);
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
                    {groups && groups.length ?
                        <BracketChooseGroups groups={groups} chosenGroups={this.state.chosenItems} handleChooseGroup={this.handleChooseGroup} />
                        :
                        <BracketChooseTeams teams={teams} chosenTeams={this.state.chosenItems} handleChooseTeam={this.handleChooseTeam} />
                    }
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
    return {
        teams: state.firestore.ordered.teams,
        groups: state.firestore.ordered.groups,
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
        },
        {
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{ collection: 'groups', orderBy: ['name', 'asc'] }],
            storeAs: 'groups'
        }]
    }
    ))(CreateBracket);