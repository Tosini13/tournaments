import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

const TournamentSummary = (props) => {
    return (
        <Link to={'tournament/' + props.tournament.id}>
            <div className='tournament-card card z-depth-1'>
                <div className='card-title tournament-title'>{props.tournament.name}</div>
                <div className='tournament-date'>{moment(props.tournament.date.toDate()).format('yyyy MMMM DD')}</div>
            </div>
        </Link>
    )
}

export default TournamentSummary;