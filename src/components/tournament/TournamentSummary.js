import React from 'react'
import moment from 'moment';
import trophy from '../../configureFiles/img/trophy.png'

import { TournamentListItemStyled, TournamentLinkItemStyled, TournamentListItemTitleStyled, TournamentListItemDateStyled, TournamentListItemImgStyled } from '../style/styledLayouts'

const TournamentSummary = (props) => {
    return (
        <TournamentListItemStyled>
            <TournamentLinkItemStyled to={'tournaments/' + props.tournament.id}>
                <TournamentListItemDateStyled>{moment(props.tournament.date).format('DD MMMM yyyy HH:mm')}</TournamentListItemDateStyled>
                <TournamentListItemImgStyled src={trophy} alt='logo' />
                <TournamentListItemTitleStyled>{props.tournament.name}</TournamentListItemTitleStyled>
            </TournamentLinkItemStyled>
        </TournamentListItemStyled>
    )
}

export default TournamentSummary;