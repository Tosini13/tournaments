import React, { Component } from 'react'
import { createTable } from '../../../structures/Groups';
import { GroupTableStyled } from '../../style/styledGroups';

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

class GroupTable extends Component {

    render() {
        const { teams, matches, promotedQtt } = this.props;
        const table = createTable(teams, matches);

        let promotionCounter = 0;
        this.table = table.map(row => {
            let rowClass = '';
            if (promotionCounter < promotedQtt) {
                rowClass += ' group-table-promoted';
            }
            if (row.live) {
                rowClass += ' group-table-live';
            }
            promotionCounter++;
            const team = teams.find((team, index) => team.id === row.team);
            return <tr key={team.id} className={rowClass}><td>{promotionCounter}</td><td>{team.name}</td><td>{row.matches}</td><td>{row.points}</td><td>{row.goalsScored}</td><td>{row.goalsLost}</td></tr>
        });
        return (
            <GroupTableStyled>
                <table>
                    <thead><tr><th><FormatListNumberedIcon /></th><th>ZESPOŁY</th><th><p>M</p></th><th><p>PKT</p></th><th><p>GZ</p></th><th>GS</th></tr></thead>
                    <tbody>
                        {this.table}
                    </tbody>
                </table>
            </GroupTableStyled>
        );
    }
}

export default GroupTable;