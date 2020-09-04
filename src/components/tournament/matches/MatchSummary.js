import React from 'react';
import { placeholderToName } from '../../../structures/Bracket';
import { connect } from 'react-redux';
import { updateBracketMatch } from '../../../store/actions/BracketAction';
import moment from 'moment'

import MatchLink from './MatchLink';

const MatchSummary = (props) => {
    const { match, teams, groups, matches, auth } = props;
    let home = teams.find(team => team.id === match.home);
    let away = teams.find(team => team.id === match.away);
    const matchTeams = placeholderToName(match, teams, groups, matches);
    if (matchTeams.home) {
        let id = matchTeams.home.id;
        if ((id && !match.home) || (match.home && !id)) {
            if (!id) {
                id = null;
            }
            if (props.updateBracketMatch) {
                let matchUpdate = {
                    ...match,
                    home: id
                }
                delete matchUpdate.id;
                props.updateBracketMatch(props.tournamentId, match.id, matchUpdate);
            }
        }
    }
    if (matchTeams.away) {
        let id = matchTeams.away.id;
        if ((id && !match.away) || (match.away && !id)) {
            if (!id) {
                id = null;
            }
            if (props.updateBracketMatch) {
                let matchUpdate = {
                    ...match,
                    away: id
                }
                delete matchUpdate.id;
                props.updateBracketMatch(props.tournamentId, match.id, matchUpdate);
            }
        }
    }
    home = home ? home : matchTeams.home;
    away = away ? away : matchTeams.away;
    let link = '#';
    if (props.bracket) {
        link = '/tournaments/' + props.tournamentId + '/bracket/' + match.id;
    } else if (props.groupId) {
        link = '/tournaments/' + props.tournamentId + '/groups/' + props.groupId + '/matches/' + match.id;
    }
    let matchClass = 'match';
    if (match.mode === 'LIVE') {
        matchClass += ' match-live';
    }
    return (
        <MatchLink link={link} auth={auth}>
            <>
                {match.name ? <p className='match-round'>{match.name}</p> : null}
                {match.date ? <p className='match-date'>{moment(match.date).format('YYYY-MM-DD HH:mm')}</p> : null}
                <div className={matchClass}>
                    <div className='match-teams'>
                        <p>
                            {home ? home.name : match.home} {/* it can be less */}
                        </p>
                        <p>vs</p>
                        <p>
                            {away ? away.name : match.away}
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
            </>
        </MatchLink>
    )
}

const mapStateToProps = (state, ownProps) => {
    const auth = state.firebase.auth.uid;
    return {
        auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBracketMatch: (tournamentId, matchId, match) => dispatch(updateBracketMatch(tournamentId, matchId, match))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MatchSummary);