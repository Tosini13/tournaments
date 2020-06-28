import React from 'react';
import { Link } from 'react-router-dom';

const MatchSummary = (props) => {
    const { match, teams } = props;
    const home = teams.find(team => team.id === match.home);
    const away = teams.find(team => team.id === match.away);
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
        <Link to={link}>
            <div className={matchClass}>
                {match.round ? <p className='match-round'>{match.round}</p> : null}
                <div className='match-teams'>
                    <p>
                        {home ? home.name : match.home}
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
        </Link>
    )
}

export default MatchSummary;