import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import TeamList from '../teams/TeamList';
import { craeteGroupMatches } from '../../../structures/Groups'

const GroupDetails = (props) => {
    const { teams, group } = props;
    const matches = craeteGroupMatches(teams, false);
    group.matches = matches;
    return (
        <div className='group'>
            <div className='group-dashboard'>
                <p className='title'>{group.name}</p>
            </div>
            <div className='group-content'>
                <TeamList teams={teams} />
                <MatchesList matches={matches} teams={teams} />
            </div>
        </div>
    )
}

export default GroupDetails;