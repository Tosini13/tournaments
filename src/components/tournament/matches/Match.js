import React from 'react';

const Match = (props) => {
    const { match, teams } = props;
    console.log(props);
    return (
        <div className='match'>
            <div className='match-teams'>
                <p>
                    {/* {match.home} */}
                    {teams.find(team => team.id == match.home).name}
                </p>
                <p>vs</p>
                <p>
                    {/* {match.away} */}
                    {teams.find(team => team.id == match.away).name}
                </p>
            </div>
            {(match.mode === 'NOT_STARTED') ?
                <div className='match-result match-result-not-started'>
                    <div>N</div> : <div>N</div>
                </div>
                :
                <div className='match-result'>
                    <div>{match.result.home}</div> : <div>{match.result.away}</div>
                </div>
            }

        </div>
    )
}

export default Match;