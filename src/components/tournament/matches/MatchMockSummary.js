import React from 'react';

const MatchMockSummary = (props) => {
    const { match, teams } = props;
    const home = teams.find(team => team.id === match.home);
    const away = teams.find(team => team.id === match.away);
    return (
        <div className='match match-mock'>
            {match.round ? match.round : null}
            <div className='match-teams'>
                <p>{home ? home.name : 'HOME'}</p>
                <p>vs</p>
                <p>{away ? away.name : 'AWAY'}</p>
            </div>
        </div>
    )
}

export default MatchMockSummary;