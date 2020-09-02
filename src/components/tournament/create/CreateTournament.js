import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import { createTournament } from '../../../store/actions/TournamentActions'
import { TournamentCreateTextFieldStyled, TournamentCreateMatchTimeContainerStyled, TournamentCreateAddressCityStyled, TournamentCreateAddressContainerStyled, TournamentCreateAddressStreetNumberStyled, TournamentCreateAddressStreetStyled } from '../../style/styledForms';
import { ButtonStyled } from '../../style/styledButtons';

class CreateTournament extends Component {

    state = {
        name: '',
        date: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        matchTimeInGroup: 10,
        breakTimeInGroup: 2,
        matchTimeInBracket: 12,
        breakTimeInBracket: 3,
        fields: 1,
        location: {
            city: '',
            street: '',
            number: ''
        },
        image: null
    }

    handleLocationDate = (e) => {
        const location = {
            ...this.state.location,
            [e.target.id]: e.target.value
        }
        this.setState({
            location
        })
    }

    handleChangeDate = (date) => {
        this.setState({
            date
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleChangeImage = (e) => {
        const image = e.target.files[0];
        this.setState({
            image
        });
    }

    handleSubmit = (e) => {
        console.log(this.state);
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
            margin: '5px 0px'
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id='create-tournament'>
                <p>Create Tournament:</p>
                <TournamentCreateTextFieldStyled style={this.style.input} id="name" label="name" value={this.state.name} onChange={this.handleChange} required />
                <TournamentCreateTextFieldStyled style={this.style.input}
                    id="date"
                    label="Match date & time"
                    type="datetime-local"
                    defaultValue={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                />

                <p>In group</p>
                <TournamentCreateMatchTimeContainerStyled>
                    <TournamentCreateTextFieldStyled style={this.style.input} name='matchTimeInGroup' id='matchTimeInGroup' label="Match time (mins)" type='number' value={this.state.matchTimeInGroup} onChange={this.handleChange} required />
                    <TournamentCreateTextFieldStyled style={this.style.input} name='breakTimeInGroup' id='breakTimeInGroup' label="Break time (mins)" type='number' value={this.state.breakTimeInGroup} onChange={this.handleChange} required />
                </TournamentCreateMatchTimeContainerStyled>
                <p>In play-offs</p>
                <TournamentCreateMatchTimeContainerStyled>
                    <TournamentCreateTextFieldStyled style={this.style.input} name='matchTimeInBracket' id='matchTimeInBracket' label="Match time (mins)" type='number' value={this.state.matchTimeInBracket} onChange={this.handleChange} required />
                    <TournamentCreateTextFieldStyled style={this.style.input} name='breakTimeInBracket' id='breakTimeInBracket' label="Break time (mins)" type='number' value={this.state.breakTimeInBracket} onChange={this.handleChange} required />
                </TournamentCreateMatchTimeContainerStyled>

                <TournamentCreateTextFieldStyled style={this.style.input} name='fields' id='fields' label="Fields quantity" type='number' value={this.state.fields} onChange={this.handleChange} required />
                <TournamentCreateAddressContainerStyled>
                    <TournamentCreateAddressCityStyled>
                        <TournamentCreateTextFieldStyled style={this.style.input} id="city" label="Miasto" value={this.state.location.city} onChange={this.handleLocationDate} />
                    </TournamentCreateAddressCityStyled>
                    <TournamentCreateAddressStreetStyled>
                        <TournamentCreateTextFieldStyled style={this.style.input} id="street" label="Ulica" value={this.state.location.street} onChange={this.handleLocationDate} />
                    </TournamentCreateAddressStreetStyled>
                    <TournamentCreateAddressStreetNumberStyled>
                        <TournamentCreateTextFieldStyled style={this.style.input} id="number" label="Numer" value={this.state.location.number} onChange={this.handleLocationDate} />
                    </TournamentCreateAddressStreetNumberStyled>
                </TournamentCreateAddressContainerStyled>
                <TournamentCreateTextFieldStyled style={this.style.input} name='icon' id='icon' label="Tournament's icon" type='file' onChange={this.handleChangeImage} />

                <ButtonStyled>
                    Create
                </ButtonStyled>
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