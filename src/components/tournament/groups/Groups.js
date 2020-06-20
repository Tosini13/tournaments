import React, { useState } from 'react'
import GroupDashboard from './GroupDashboard';
import { Link } from 'react-router-dom';

const Groups = (props) => {

    const handleAddGroups = () => {
        // setGroups({});
        console.log(groups);
    }

    const { groups } = props;
    // const [groups, setGroups] = useState(props.groups);

    if (Boolean(groups) && groups.length) {
        return (
            <GroupDashboard tournamentId={props.tournamentId} groups={groups} />
        )
    } else {
        return (
            <div className='group-dashboard'>
                <p className='title'>Groups</p>
                <Link className='btn' to={props.tournamentId + '/groups/create'}>Add groups</Link>
            </div>
        )
    }
}

export default Groups;