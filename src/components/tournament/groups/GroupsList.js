import React from 'react';
import Group from './Group';
import { Link } from 'react-router-dom';

const GroupsList = (props) => {
    const { groups } = props;
    return (
        <div className='btns'>
            {groups && groups.map(group => {
                return <Link to={'/tournaments/' + props.tournamentId + '/groups/' + group.id}
                    className='btn'
                    key={group.id}>{group.name}</Link>
            })}
        </div>
    )
}

export default GroupsList;