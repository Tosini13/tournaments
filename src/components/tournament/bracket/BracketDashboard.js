import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBracketFromTournament } from '../../../store/actions/BracketAction';

const BracketDashboard = (props) => {
    const { bracket, auth, groupFinished } = props;
    if (Boolean(bracket) && bracket.length) {
        return (
            <div className='bracket-dashboard'>
                <div className='btns'>
                    <Link className='btn' to={'/tournaments/' + props.tournamentId + '/bracket'}>Faza pucharowa</Link>
                </div>
                <div className='btn btn-red'
                    onClick={() => {
                        console.log('to delete');
                        props.deleteBracketFromTournament(props.tournamentId)
                    }}
                >USUŃ FAZĘ PUCHAROWĄ</div>
            </div>
        )
    }
    else if (groupFinished) {
        return (
            <div className='groups-dashboard'>
                <p className='title'>Play-offs are not available, because group(s) are already finshed</p>
                <p className='title'>Faza pucharowa nie jest dostępna, ponieważ faza grupowa już się skończyła!</p>
            </div>
        )
    } else if (auth) {
        return (
            <div className='bracket-dashboard'>
                <div className='btns'>
                    <Link className='btn' to={'/tournaments/' + props.tournamentId + '/bracket/create'}>Stwórz fazę pucharową</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='groups-dashboard'>
            <p className='title'>Faza pucharowa nie jest jeszcze dostępna!</p>
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