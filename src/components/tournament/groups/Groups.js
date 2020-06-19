import React, { useState } from 'react'
import GroupDashboard from './GroupDashboard';

const Groups = (props) => {

    const handleAddGroups = () => {
        // setGroups({});
        console.log(groups);
    }

    const { groups } = props;

    // const [groups, setGroups] = useState(props.groups);
    
    if (groups) {
        return (
            <GroupDashboard tournamentId={props.tournamentId} groups={groups} />
        )
    } else {
        return (
            <div className='add-groups'>
                <div className='btn' onClick={handleAddGroups}>
                    Add groups
                </div>
            </div>
        )
    }
}

export default Groups;