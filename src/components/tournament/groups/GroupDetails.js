import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import TeamList from '../teams/TeamList';

class GroupDetails extends Component {

    state = {
        name: this.props.group.name
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { teams, group, creation } = this.props;
        group.name = this.state.name;
        return (
            <>
                <div className='group-dashboard'>
                    {creation ?
                        <form>
                            <input className='title' name='name' type='text' value={this.state.name} onChange={this.handleOnChange} />
                        </form>
                        :
                        <p className='title'>{group.name}</p>
                    }
                </div>
                {teams.length ?

                    <div className='group-content'>
                        <TeamList teams={teams} />
                        <MatchesList matches={group.matches} teams={teams} />
                    </div>
                    :
                    null
                }
            </>
        )
    }
}

export default GroupDetails;