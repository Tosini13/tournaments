import React from 'react';

const Match = (props) => {
    const { match } = props;
    console.log(props);
    return (
        <div>
            {match.home} - {match.away}
            {(match.mode === 'NOT_STARTED') ?
                <span className='match-result'>N : N</span>
                :
                <span className='match-result'>{match.result.home} : {match.result.away}</span>
            }

        </div>
    )
}

export default Match;