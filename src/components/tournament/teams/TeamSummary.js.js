import React, { Component } from 'react'

class TeamSummary extends Component {

    state = {
        edit: false,
        team: {
            name: this.props.team.name
        }
    }

    handleChange = (e) => {
        let team = this.state.team;
        team.name = e.target.value;
        this.setState({
            team
        })
    }

    render() {
        const { team, control, deleteControl, handleDeleteTeam, handleEditTeam } = this.props;
        return (
            <div className='team'>
                <div className='btns'>
                    {deleteControl ?
                        <div className='btn btn-red btn-icon' onClick={() => {
                            handleDeleteTeam(team.id);
                        }}>
                            <i className='icon-trash-empty'></i>
                        </div>
                        :
                        null
                    }
                    {control ?
                        <div className='btn btn-blue btn-icon' onClick={() => {
                            this.setState({ edit: true });
                        }}>
                            <i className='icon-pencil-1'></i>
                        </div>
                        :
                        null
                    }
                </div>
                {this.state.edit ?
                    <form className='team-name-form' onSubmit={() => {
                        handleEditTeam(team.id, this.state.team);
                        this.setState({ edit: false });
                    }}>
                        <input className='team-name' type='text' value={this.state.team.name} onChange={this.handleChange}></input>
                        <button type='submit' className='btn btn-green btn-icon'>
                            <i className='icon-ok'></i>
                        </button>
                    </form>
                    :
                    <p className='team-name'>{this.state.team.name}</p>
                }
            </div>
        )
    }

}

export default TeamSummary;