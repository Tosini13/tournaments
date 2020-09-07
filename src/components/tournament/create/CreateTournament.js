import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';

import { createTournament } from '../../../store/actions/TournamentActions'
import CreateTournamentLocation from './CreateTournamentLocation';
import CreateTournamentMatchesInfo from './CreateTournamentMatchesInfo';
import CreateTournamentBasicInfo from './CreateTournamentBasicInfo';
import CreateTournamentLogo from './CreateTournamentLogo';
import VerticalStepper from './VerticalStepper';
import { setBackBtn } from '../../../structures/extra';
import { changeMenu } from '../../../store/actions/MenuActions';
import { ButtonRowContainerStyled, ButtonStyled } from '../../style/styledButtons';

const formError = {
    attr: {
        name: false,
        date: true,
        matchTimeInGroup: false,
        breakTimeInGroup: false,
        matchTimeInBracket: false,
        breakTimeInBracket: false,
        fields: false,
        city: false,
        street: false,
        number: false,
        image: false,
        inValid: false
    },
    onCheckName: (name) => {
        return (/[\S]/.test(name));
    },
    onCheckDate: (date) => {
        return moment(date).isValid();
    },
    get isValid() {
        Object.values(this.attr).forEach(value => {
            if (value) return false;
        });
        return true;
    }
}

class CreateTournament extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/');
        });
        this.props.changeMenu(null);
    }

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
        image: null,
        formError: formError,
    }

    handleChangeLocation = (e) => {
        console.log(e.target.value);
        const location = {
            ...this.state.location,
            [e.target.id]: e.target.value
        }
        this.setState({
            location
        })
    }

    handleChangeDate = (date) => {
        console.log(date);
        this.setState({
            date
        })
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.id]: e.target.value });
    }

    handleChangeImage = (e) => {
        const image = e.target.files[0];
        this.setState({
            image
        });
    }

    onRemoveImage = () => {
        this.setState({
            image: null
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.checkInputs()) {
            console.log('ok');
            this.props.createTournament(this.state);
            this.props.history.push('/');
        } else {
            console.log('wrong string');
        }
    }

    checkInputs = () => {
        let isValid = true;
        if (!this.state.formError.onCheckName(this.state.name)) {
            this.setState({
                formError: {
                    ...this.state.formError,
                    attr: {
                        ...this.state.formError.attr,
                        name: true
                    }
                }
            })
            isValid = false;
        }

        return isValid;
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <CreateTournamentBasicInfo name={this.state.name} handleChange={this.handleChange} />
                        <CreateTournamentLogo image={this.state.image} handleChangeImage={this.handleChangeImage} onRemoveImage={this.onRemoveImage} />
                    </>
                )
            case 1:
                return <CreateTournamentMatchesInfo fields={this.state.fields} matchTimeInGroup={this.state.matchTimeInGroup} breakTimeInGroup={this.state.breakTimeInGroup} matchTimeInBracket={this.state.matchTimeInBracket} breakTimeInBracket={this.state.breakTimeInBracket} handleChange={this.handleChange} />
            case 2:
                return <CreateTournamentLocation location={this.state.location} handleChangeLocation={this.handleChangeLocation} />
            case 3: return (
                <ButtonRowContainerStyled>
                    <ButtonStyled type='submit'>Stwórz</ButtonStyled>
                </ButtonRowContainerStyled>
            );
            default:
                return 'Unknown step';
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id='create-tournament'>
                <VerticalStepper getStepContent={this.getStepContent} />
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: (menu) => dispatch(changeMenu(menu)),
        createTournament: (tournament) => dispatch(createTournament(tournament))
    }
}

export default connect(null, mapDispatchToProps)(CreateTournament);