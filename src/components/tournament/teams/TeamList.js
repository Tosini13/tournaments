import React from 'react'
import { connect } from 'react-redux';
import { deleteTeamFromTournament, editTeamFromTournament } from '../../../store/actions/TeamActions';
import TeamSummary from './TeamSummary.js';

const TeamList = (props) => {

    const handleDeleteTeam = (teamId) => {
        props.deleteTeamFromTournament(props.tournamentId, teamId);
    }

    const handleEditTeam = (teamId, team) => {
        props.editTeamFromTournament(props.tournamentId, teamId, team);
    }

    return (
        <div className='team-list z-depth-1'>
            {props.teams && props.teams.map(team => {
                return (
                    <TeamSummary key={team.id} team={team} control={props.control} deleteControl={props.deleteControl} handleDeleteTeam={handleDeleteTeam} handleEditTeam={handleEditTeam} />
                )
            })}
        </div>
    )
}
const mapDispatchToState = (dispatch) => {
    return {
        deleteTeamFromTournament: (tournamentId, teamId) => dispatch(deleteTeamFromTournament(tournamentId, teamId)),
        editTeamFromTournament: (tournamentId, teamId, team) => dispatch(editTeamFromTournament(tournamentId, teamId, team))
    }
}

export default connect(null, mapDispatchToState)(TeamList);