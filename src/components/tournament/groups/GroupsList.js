import React from 'react';

import { GroupSummaryListStyled } from '../../style/styledGroups';
import { ListItemLinkStyled } from '../../style/styledLayouts';

const GroupsList = (props) => {
    const { groups } = props;
    return (
        <GroupSummaryListStyled>
            {groups && groups.map(group =>
                <ListItemLinkStyled to={'/tournaments/' + props.tournamentId + '/groups/' + group.id} key={group.id}>
                    {group.name}
                </ListItemLinkStyled>
            )}
        </GroupSummaryListStyled >
    )
}

export default GroupsList;