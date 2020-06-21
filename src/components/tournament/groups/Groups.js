import React, { useState } from 'react'
import GroupDashboard from './GroupDashboard';
import { Link } from 'react-router-dom';

const Groups = (props) => {

    const { groups, auth } = props;
    if (Boolean(groups) && groups.length) {
        return (
            <GroupDashboard tournamentId={props.tournamentId} groups={groups} />
        )
    } else if (auth) {
        return (
            <div className='group-dashboard'>
                <p className='title'>Groups</p>
                <div className='btns'>
                    <Link className='btn' to={props.tournamentId + '/group/create'}>Add groups</Link>
                </div>
            </div>
        )
    }else{
        return(
            <div className='group-dashboard'>
                <p className='title'>Groups are not available yet</p>
            </div>
        )
    }
}

export default Groups;