import React from 'react';
import Group from './Group';
import { Link } from 'react-router-dom';

const GroupsList = (props) => {
    const { groups } = props;
    return (
        <div className='group-list'>
            {groups && groups.map(group => {
                return <Link to={'/tournament/' + props.tournamentId + '/group/' + group.id}
                    className='btn'
                    key={group.id}>{group.name}</Link>
            })}
        </div>
    )
}

export default GroupsList;