import React from 'react';
import { Link } from 'react-router-dom';

const MatchSummary = (props) => {
    const { match, teams } = props;
    const home = teams.find(team => team.id === match.home);
    const away = teams.find(team => team.id === match.away);
    // console.log(match);
    if (home && away) {
        let matchClass = 'match';
        if (match.mode === 'LIVE') {
            matchClass += ' match-live';
        }
        return (
            <Link to={'/tournaments/' + props.tournamentId + '/groups/' + props.groupId + '/matches/' + match.id}>
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
            </Link>
        )
    } else {
        return null;
    }
}

export default MatchSummary;