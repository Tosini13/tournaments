import React from 'react';
import { Link } from 'react-router-dom';

const GroupsList = (props) => {
    const { groups } = props;
    return (
        <div className='groups-list'>
            {groups && groups.map(group => {
                return <Link to={'/tournaments/' + props.tournamentId + '/groups/' + group.id} key={group.id}>
                    <div className='group-card card z-depth-1 grey center'>
                        {group.name}
                    </div>
                </Link>
            })}
        </div>
    )
}

export default GroupsList;