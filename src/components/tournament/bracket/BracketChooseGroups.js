import React from 'react'

const BracketChooseGroups = (props) => {

    const { groups, chosenGroups } = props;
    return (
        <div className='bracket-choose-list'>
            {groups.map((group) => {
                const groupPlaces = group.teams.map((team, i) => {
                    let groupPlaceClass = 'bracket-choose-children-places';
                    let groupPlaceholder = {
                        lastRound: group.id,
                        place: i
                    }
                    chosenGroups.forEach(chosen => {
                        if (chosen.lastRound === groupPlaceholder.lastRound && chosen.place === groupPlaceholder.place) {
                            groupPlaceClass += ' promoted';
                        }
                    });
                    return (
                        <div key={i} className={groupPlaceClass} onClick={() => {
                            props.handleChooseGroup(groupPlaceholder, group)
                        }}>{(i + 1) + ' place'}</div>
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