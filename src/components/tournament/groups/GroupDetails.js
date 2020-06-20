import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import TeamList from '../teams/TeamList';
import { craeteGroupMatches } from '../../../structures/Groups'

const GroupDetails = (props) => {
    const { teams, name } = props.group;
    const matches = craeteGroupMatches(teams, false);
    return (
        <div className='group'>
            <div className='group-dashboard'>
                <p className='title'>{props.group.name}</p>
            </div>
            <div className='group-content'>
                <TeamList teams={teams} />
                <MatchesList matches={matches} teams={teams} />
            </div>
        </div>
    )
}

export default GroupDetails;