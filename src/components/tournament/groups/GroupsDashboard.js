import React from 'react'
import { Link } from 'react-router-dom';
import GroupsList from './GroupsList';

const GroupsDashboard = (props) => {

    const { groups, bracket, auth } = props;
    if (Boolean(groups) && groups.length) {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Groups</p>
                <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
            </div>
        )
    } else if (auth) {
        if (bracket) {
            return (
                <div className='groups-dashboard'>
                    <p className='title'>Groups are not available because bracket is already created!</p>
                </div>
            )
        }
        return (
            <div className='groups-dashboard'>
                <p className='title'>Groups</p>
                <div className='btns'>
                    <Link className='btn' to={props.tournamentId + '/groups/create'}>Add groups</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Groups are not available yet for visitors</p>
            </div>
        )
    }
}

export default GroupsDashboard;