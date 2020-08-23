import React, { useState } from 'react'
import firebase from 'firebase';
import moment from 'moment';
import trophy from '../../configureFiles/img/trophy.png'

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import {
    TournamentListItemStyled, TournamentLinkItemStyled,
    TournamentListItemTitleStyled, TournamentListItemDateStyled,
    TournamentListItemImgStyled, TournamentListItemFavouriteStyled
} from '../style/styledTournament'

const TournamentSummary = (props) => {

    const [image, setImage] = useState(null);

    if (props.tournament.image) {
        const url = `images/${props.tournament.authorId}/`;
        const storage = firebase.storage();
        const pathReference = storage.ref(url);

        pathReference.child(props.tournament.image).getDownloadURL().then(function (url) {
            setImage(url);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const favourite = false;
    return (
        <TournamentListItemStyled>
            <TournamentLinkItemStyled to={'tournaments/' + props.tournament.id}>
                <TournamentListItemImgStyled src={image ? image : trophy} alt='logo' />
                <TournamentListItemTitleStyled>{props.tournament.name}</TournamentListItemTitleStyled>
                <div>
                    <TournamentListItemDateStyled>{moment(props.tournament.date).format('HH:mm')}</TournamentListItemDateStyled>
                    <TournamentListItemFavouriteStyled>
                        {favourite ? <StarIcon /> : <StarBorderIcon />}
                    </TournamentListItemFavouriteStyled>
                </div>
            </TournamentLinkItemStyled>
        </TournamentListItemStyled>
    )
}

export default TournamentSummary;