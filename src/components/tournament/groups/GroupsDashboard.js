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
                <GroupsList tournamentId={props.tournamentId} groups={props.groups} />
                <div className='btn btn-red'
                    onClick={() => {
                        console.log('to delete');
                        props.deleteAllGroupsFromTournament(props.tournamentId)
                    }}
                >USUŃ FAZĘ GRUPOWĄ</div>
            </div>
        )
    } else if (auth) {
        if (bracket) {
            return (
                <div className='groups-dashboard'>
                    <p className='title'>Faza grupowa nie jest dostępna, ponieważ faza pucharowa jest już stworzona!</p>
                </div>
            )
        }
        return (
            <div className='groups-dashboard'>
                <div className='btns'>
                    <Link className='btn' to={props.tournamentId + '/groups/create'}>Stwórz fazę grupową</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Faza grupowa nie jest jeszcze dostępna!</p>
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