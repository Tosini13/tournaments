import React from 'react'

const BracketChooseGroups = (props) => {

    const { groups, chosenGroups } = props;
    return (
        <div className='bracket-choose-list'>
            {groups.map((group) => {
                const groupPlaces = group.teams.map((team, i) => {
                    let groupPlaceClass = 'bracket-choose-children-places';
                    let groupPlaceName = group.name + ' ' + (i + 1);
                    if (chosenGroups.includes(groupPlaceName)) {
                        groupPlaceClass += ' promoted';
                    }
                    return (
                        <div key={team.id} className={groupPlaceClass} onClick={() => { props.handleChooseGroup(groupPlaceName) }}>{(i + 1) + ' place'}</div>
                    )
                })
                return (
                    <div key={group.id} className='bracket-choose'>
                        <p className='bracket-choose-title'>{group.name}</p>
                        <div className='bracket-choose-children'>{groupPlaces}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default BracketChooseGroups;