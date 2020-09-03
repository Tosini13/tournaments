import React from 'react';
import moment from 'moment'

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PlaceIcon from '@material-ui/icons/Place';

import { TournamentDetailsInfoStyled, TournamentDetailsInfoContentStyled } from '../../style/styledTournament'
import { MainContainerStyled, MainContainerContentStyled } from '../../style/styledLayouts';
import { ALinkStyled } from '../../style/styledButtons';

const TournamentDetailsInfo = ({ tournament, children }) => {
    return (
        <MainContainerStyled>
            <MainContainerContentStyled>
                <TournamentDetailsInfoStyled>
                    <EventAvailableIcon />
                    <TournamentDetailsInfoContentStyled>{moment(tournament.date).format('yyyy MMMM DD')}</TournamentDetailsInfoContentStyled>
                </TournamentDetailsInfoStyled>
                <TournamentDetailsInfoStyled>
                    <ScheduleIcon />
                    <TournamentDetailsInfoContentStyled>{moment(tournament.date).format('HH:mm')}</TournamentDetailsInfoContentStyled>
                </TournamentDetailsInfoStyled>
                {tournament.location ?
                    <TournamentDetailsInfoStyled>
                        <PlaceIcon />
                        <TournamentDetailsInfoContentStyled>
                            <ALinkStyled href={`https://www.google.com/maps/search/?api=1&query=${tournament.location.split(' ').join('+')}`} target='_blank'>{tournament.location}</ALinkStyled>
                        </TournamentDetailsInfoContentStyled>
                    </TournamentDetailsInfoStyled>
                    : null
                }
            </MainContainerContentStyled>
            {children}
        </MainContainerStyled>
    );
}

export default TournamentDetailsInfo;