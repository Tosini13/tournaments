import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signIn } from '../../store/actions/AuthActions'
import { ButtonStyled } from '../style/styledButtons';
import { AuthFormStyled, FormTitleStyled, TextFiledContainerStyled, AuthTextFiledStyled } from '../style/styledForms';



class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <AuthFormStyled onSubmit={this.handleSubmit}>
                <FormTitleStyled>Sign In</FormTitleStyled>
                <TextFiledContainerStyled>
                    <AuthTextFiledStyled label="E-mail" type="email" id='email' onChange={this.handleChange} value={this.state.email} />
                    <AuthTextFiledStyled label="Hasło" type="password" id='password' onChange={this.handleChange} value={this.state.password} />
                </TextFiledContainerStyled>
                <ButtonStyled type='submit'>Zaloguj</ButtonStyled>
                <div className="red-text center">
                    {authError ? <p>{authError}</p> : null}
                </div>
            </AuthFormStyled>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
