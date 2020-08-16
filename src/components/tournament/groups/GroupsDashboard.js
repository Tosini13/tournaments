import React from 'react'
import { Link } from 'react-router-dom';
import GroupsList from './GroupsList';
import { connect } from 'react-redux';
import { deleteAllGroupsFromTournament } from '../../../store/actions/GroupActions';

const GroupsDashboard = (props) => {

    const { groups, bracket, auth } = props;
    if (Boolean(groups) && groups.length) {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Groups</p>
                <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
                <div className='btn btn-red'
                    onClick={() => {
                        console.log('to delete');
                        props.deleteAllGroupsFromTournament(props.tournamentId)
                    }}
                >DELETE GROUPS</div>
            </div>
        )
    } else if (auth) {
        if (bracket) {
            return (
                <div className='groups-dashboard'>
                    <p className='title'>Groups are not available because bracket is already created!</p>
                </div>
            )
        }
        return (
            <div className='groups-dashboard'>
                <p className='title'>Groups</p>
                <div className='btns'>
                    <Link className='btn' to={props.tournamentId + '/groups/create'}>Add groups</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Groups are not available yet for visitors</p>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        deleteAllGroupsFromTournament: (tournamentId) => dispatch(deleteAllGroupsFromTournament(tournamentId))
    }
}

export default connect(null, mapStateToDispatch)(GroupsDashboard);