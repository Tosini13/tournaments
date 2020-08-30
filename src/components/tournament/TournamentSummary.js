import React, { useState, useEffect } from 'react'
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

    useEffect(() => {
        if (props.tournament.image) {
            const url = `images/${props.tournament.authorId}/`;
            const imageId = `${url}${props.tournament.image}`;
            const img = localStorage.getItem(imageId);
            if (!img) {
                const storage = firebase.storage();
                const pathReference = storage.ref(url);

                pathReference.child(props.tournament.image).getDownloadURL().then(function (imgUrl) {
                    localStorage.setItem(imageId, imgUrl);
                    setImage(imgUrl);
                }).catch(function (error) {
                });
            } else {
                setImage(img);
            }
        }
    })

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