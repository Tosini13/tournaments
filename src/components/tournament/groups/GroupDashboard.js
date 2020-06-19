import React from 'react';
import GroupsList from './GroupsList';

const GroupDashboard = (props) => {
    return (
        <div className='group-dashboard'>
            <p className='title'>Groups</p>
            <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
        </div>
    )
}

export default GroupDashboard;