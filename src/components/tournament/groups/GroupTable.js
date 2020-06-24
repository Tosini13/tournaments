import React, { Component } from 'react'
import { createTable } from '../../../structures/Groups';

class GroupTable extends Component {

    render() {
        const { teams, matches } = this.props;
        const table = createTable(teams, matches);

        let promotedQtt = 1;
        let promotionCounter = 0;
        this.table = table.map(row => {
            this.tablePromoted = '';
            if (promotionCounter < promotedQtt) {
                this.tablePromoted += ' tablePromoted';
            }
            promotionCounter++;
            const team = teams.find(team => team.id === row.team);
            return <tr key={team.id} className={this.tablePromoted}><td>{team.name}</td><td>{row.points}</td><td>{row.goalsScored}</td><td>{row.goalsLost}</td></tr>
        });
        return (
            <div className='group-table'>
                <table>
                    <thead><tr><th>Team</th><th>points</th><th>scored</th><th>lost</th></tr></thead>
                    <tbody>
                        {this.table}
                    </tbody>
                </table>
            </div >
        );
    }
}

export default GroupTable;