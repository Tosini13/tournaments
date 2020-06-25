import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { createTournament } from '../../../store/actions/TournamentActions'

class CreateTournament extends Component {

    state = {
        name: '',
        date: new Date()
    }

    handleChangeDate = (date) => {
        this.setState({
            date
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (/[\S]/.test(this.state.name)) {
            this.props.createTournament(this.state);
            this.props.history.push('/');
        } else {
            console.log('wrong string');
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='create-tournament'>
                <p>Create Tournament:</p>
                <label>Name:</label>
                <input name='name' id='name' value={this.state.name} onChange={this.handleChange} required />
                <DatePicker id='date' className='center'
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                    dateFormat="yyyy MMMM dd"
                    showYearDropdown
                    showMonthDropdown
                />
                <button className="btn btn-icon lighten-1 z-depth-0">
                    <i className='icon-ok'></i>
                </button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTournament: (tournament) => dispatch(createTournament(tournament))
    }
}

export default connect(null, mapDispatchToProps)(CreateTournament);