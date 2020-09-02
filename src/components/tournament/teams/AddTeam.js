import React, { Component } from "react";
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';

import { addTeamToTournament } from "../../../store/actions/TeamActions";
import { IconButtonStyled } from "../../style/styledButtons";
import { AddIconStyled } from "../../style/styledIcons";
import { AddTeamFormStyled } from "../../style/styledForms";

const style = {
    textFiled: {
        marginRight: '10px',
        flexGrow: '1'
    }
}

class AddTeam extends Component {

    state = {
        name: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (/[\S]/.test(this.state.name)) {
            this.props.addTeamToTournament(this.props.tournamentId, this.state);
            this.setState({ name: '' });
        } else {
            console.log('wrong string');
        }
    }

    render() {
        return (
            <AddTeamFormStyled onSubmit={this.handleSubmit}>
                <TextField id="standard-basic" label="Nazwa" name='name' onChange={this.handleChange} value={this.state.name} style={style.textFiled} />
                <IconButtonStyled aria-label="add">
                    <AddIconStyled />
                </IconButtonStyled>
            </AddTeamFormStyled>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTeamToTournament: (tournamentId, team) => dispatch(addTeamToTournament(tournamentId, team))
    }
}

export default connect(null, mapDispatchToProps)(AddTeam);