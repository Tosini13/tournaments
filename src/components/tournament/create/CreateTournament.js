import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { createTournament } from '../../../store/actions/TournamentActions'

class CreateTournament extends Component {

    state = {
        id: Math.random(), 
        title: '',
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
        this.props.createTournament(this.state);
        this.props.history.push('/');
    }

    render() {
        console.log(this.props);
        return (
            <form onSubmit={this.handleSubmit} className='create-tournament container'>
                <p>Create Tournament:</p>
                <label>Name:</label>
                <input name='title' id='title' value={this.state.title} onChange={this.handleChange} />
                <DatePicker id='date' className='center'
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                    dateFormat="yyyy MMMM dd"
                    showYearDropdown
                    showMonthDropdown
                />
                <button className="btn pink lighten-1 z-depth-0">Create</button>
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