import React from 'react';

const MatchesMockList = (props) => {
    const { matches, teams } = props;
    let i = 0;
    return (
        <div className='matches-list'>
            {matches && matches.map(match => {
                const home = teams.find(team => team.id === match.home);
                const away = teams.find(team => team.id === match.away);
                if (home && away) {
                    return (
                        <div className='match' key={i++}>
                            {match.round ? <p className='round-title'>{match.round}</p> : null}
                            <div className='match-teams'>
                                <p>
                                    {home.name}
                                </p>
                                <p>vs</p>
                                <p>
                                    {away.name}
                                </p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className='match' key={i++}>
                            {match.round ? <p className='round-title'>{match.round}</p> : null}
                            <div className='match-teams'>
                                <p>
                                    Home
                                </p>
                                <p>vs</p>
                                <p>
                                    Away
                                </p>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default MatchesMockList;