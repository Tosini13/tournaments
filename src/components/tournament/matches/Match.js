import React from 'react';

const Match = (props) => {
    const { match, teams } = props;
    const home = teams.find(team => team.id == match.home);
    const away = teams.find(team => team.id == match.away);
    if (home && away) {
        return (
            <div className='match'>
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
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Match;