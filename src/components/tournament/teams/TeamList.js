import React from 'react'
import { connect } from 'react-redux';
import { deleteTeamFromTournament } from '../../../store/actions/TeamActions';
import tournamentReducer from '../../../store/reducers/TournamentReducer';


const TeamList = (props) => {
    const handleDeleteTeam = (teamId) => {
        console.log(teamId);
        props.deleteTeamFromTournament(props.tournamentId, teamId);
    }

    return (
        <div className='team-list z-depth-1'>
            <p className='title'>Teams</p>
            {props.teams && props.teams.map(team => {
                return (
                    <div className='team' key={team.id}>
                        <p className='team-name'>{team.name}</p>
                        <div className='btns'>
                            {props.control ?
                                <div className='btn btn-red btn-icon' onClick={() => {
                                    handleDeleteTeam(team.id);
                                }}>
                                    <i className='icon-trash-empty'></i>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
const mapDispatchToState = (dispatch) => {
    return {
        deleteTeamFromTournament: (tournamentId, teamId) => dispatch(deleteTeamFromTournament(tournamentId, teamId))
    }
}

export default connect(null, mapDispatchToState)(TeamList);