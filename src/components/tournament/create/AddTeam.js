import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeamToTournament } from "../../../store/actions/TeamActions";

class AddTeam extends Component {

    state = {
        name: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTeamToTournament(this.props.tournamentId, this.state);
        this.setState({ name: '' });
    }

    render() {
        const styleForm = {
            display: 'flex'
        }
        return (
            <form onSubmit={this.handleSubmit} className='team-add' style={styleForm}>
                <button className='btn'>
                    +
                    <div></div>
                    <div></div>
                </button>
                <input name='name' onChange={this.handleChange} value={this.state.name} />
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTeamToTournament: (tournamentId, team) => dispatch(addTeamToTournament(tournamentId, team))
    }
}

export default connect(null, mapDispatchToProps)(AddTeam);