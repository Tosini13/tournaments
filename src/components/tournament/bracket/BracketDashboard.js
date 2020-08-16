import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBracketFromTournament } from '../../../store/actions/BracketAction';

const BracketDashboard = (props) => {
    const { bracket, auth, groupFinished } = props;
    if (Boolean(bracket) && bracket.length) {
        return (
            <div className='bracket-dashboard'>
                <p className='title'>Play-offs</p>
                <div className='btns'>
                    <Link className='btn' to={'/tournaments/' + props.tournamentId + '/bracket'}>play-offs</Link>
                </div>
                <div className='btn btn-red'
                    onClick={() => {
                        console.log('to delete');
                        props.deleteBracketFromTournament(props.tournamentId)
                    }}
                >DELETE PLAY-OFFS</div>
            </div>
        )
    }
    else if (groupFinished) {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Play-offs</p>
                <p className='title'>Play-offs are not available, because group(s) are already finshed</p>
            </div>
        )
    } else if (auth) {
        return (
            <div className='bracket-dashboard'>
                <p className='title'>Play-offs</p>
                <div className='btns'>
                    <Link className='btn' to={'/tournaments/' + props.tournamentId + '/bracket/create'}>Add play-offs</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Play-offs</p>
                <p className='title'>Play-offs are not available yet for visitors</p>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        deleteBracketFromTournament: (tournamentId) => dispatch(deleteBracketFromTournament(tournamentId))
    }
}

export default connect(null, mapStateToDispatch)(BracketDashboard);