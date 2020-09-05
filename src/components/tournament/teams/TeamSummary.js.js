import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';

import { IconButtonStyled } from '../../style/styledButtons';
import { DeleteIconStyled, EditIconStyled, ClearIconStyled, DoneIconStyled } from '../../style/styledIcons';
import { TeamListElementStyled, TeamListNameStyled } from '../../style/styledTeams';
import { EditTeamFormStyled } from '../../style/styledForms';
import Question from '../../extra/Question';

const style = {
    textFiled: {
        marginLeft: '15px',
        flexGrow: '1'
    }
}


class TeamSummary extends Component {

    state = {
        question: null,
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

    handleDeleteTeamQuestion = () => {
        const team = this.props.team;
        this.setState({
            question: {
                question: `Czy na pewno chcesz usunąć zespół ${team.name}?`,
                answer1: {
                    answer: 'Yes',
                    feedback: () => {
                        this.props.handleDeleteTeam(team.id);
                    }
                },
                answer2: {
                    answer: 'No',
                    feedback: () => {
                        this.setState({ question: null });
                    }
                }
            }
        });
    }

    handleCloseQuestion = () => {
        this.setState({
            question: null
        })
    }
    render() {
        const { team, control, deleteControl, handleEditTeam } = this.props;
        return (
            <>
                <TeamListElementStyled>
                    {this.state.edit ?
                        <EditTeamFormStyled>
                            <IconButtonStyled aria-label="cancel" onClick={() => {
                                this.setState({
                                    team: {
                                        name: this.props.team.name
                                    },
                                    edit: false
                                });
                            }}>
                                <ClearIconStyled />
                            </IconButtonStyled>
                            <IconButtonStyled aria-label="submit" onClick={() => {
                                handleEditTeam(team.id, this.state.team);
                                this.setState({ edit: false });
                            }}>
                                <DoneIconStyled />
                            </IconButtonStyled>
                            <TextField id="standard-basic" label="Nazwa" name='name' value={this.state.team.name} onChange={this.handleChange} style={style.textFiled} />
                        </EditTeamFormStyled>
                        :
                        <>
                            <div className='btns'>
                                {deleteControl ?
                                    <IconButtonStyled aria-label="delete" onClick={() => {
                                        this.handleDeleteTeamQuestion();
                                    }}>
                                        <DeleteIconStyled />
                                    </IconButtonStyled>
                                    :
                                    null
                                }
                                {control ?
                                    <IconButtonStyled aria-label="delete" onClick={() => {
                                        this.setState({ edit: true });
                                    }}>
                                        <EditIconStyled />
                                    </IconButtonStyled>
                                    :
                                    null
                                }
                            </div>
                            <TeamListNameStyled className='team-name'>{this.state.team.name}</TeamListNameStyled>
                        </>
                    }
                </TeamListElementStyled>
                {this.state.question ? <Question question={this.state.question} onClose={this.handleCloseQuestion} open={Boolean(this.state.question)} /> : null}
            </>
        )
    }

}

export default TeamSummary;