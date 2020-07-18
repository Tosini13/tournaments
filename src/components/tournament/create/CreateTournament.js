import React, { Component } from 'react'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { createTournament } from '../../../store/actions/TournamentActions'
import TextField from '@material-ui/core/TextField';

class CreateTournament extends Component {

    state = {
        name: '',
        date: new Date(),
        matchTimeInGroup: 10,
        breakTimeInGroup: 2,
        matchTimeInBracket: 12,
        breakTimeInBracket: 3
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

    style = {
        input: {
            margin: '5px 10px'
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id='create-tournament'>
                <p>Create Tournament:</p>
                <TextField style={this.style.input} id="name" label="name" value={this.state.name} onChange={this.handleChange} required />
                <TextField style={this.style.input}
                    id="dateTime"
                    label="Match date & time"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    // className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <p>In group</p>
                <div className='tournament-time'>
                    <TextField style={this.style.input} name='matchTimeInGroup' id='matchTimeInGroup' label="Match time (mins)" type='number' value={this.state.matchTimeInGroup} onChange={this.handleChange} required />
                    <TextField style={this.style.input} name='breakTimeInGroup' id='breakTimeInGroup' label="Break time (mins)" type='number' value={this.state.breakTimeInGroup} onChange={this.handleChange} required />
                </div>
                <p>In play-offs</p>
                <div className='tournament-time'>
                    <TextField style={this.style.input} name='matchTimeInBracket' id='matchTimeInBracket' label="Match time (mins)" type='number' value={this.state.matchTimeInBracket} onChange={this.handleChange} required />
                    <TextField style={this.style.input} name='breakTimeInBracket' id='breakTimeInBracket' label="Break time (mins)" type='number' value={this.state.breakTimeInBracket} onChange={this.handleChange} required />
                </div>
                <div className='btns'>
                    <button className="btn lighten-1 z-depth-0">
                        Create
                    </button>
                </div>
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