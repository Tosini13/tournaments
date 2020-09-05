import React from 'react'
import { TournamentCreateTextFieldStyled, TournamentCreateAddressCityStyled, TournamentCreateAddressContainerStyled, TournamentCreateAddressStreetNumberStyled, TournamentCreateAddressStreetStyled } from '../../style/styledForms';

const CreateTournamentLocation = ({ location, handleChangeLocation }) => {

    return (
            <TournamentCreateAddressContainerStyled>
                <TournamentCreateAddressCityStyled>
                    <TournamentCreateTextFieldStyled id="city" label="Miasto" value={location.city} onChange={handleChangeLocation} />
                </TournamentCreateAddressCityStyled>
                <TournamentCreateAddressStreetStyled>
                    <TournamentCreateTextFieldStyled id="street" label="Ulica" value={location.street} onChange={handleChangeLocation} />
                </TournamentCreateAddressStreetStyled>
                <TournamentCreateAddressStreetNumberStyled>
                    <TournamentCreateTextFieldStyled id="number" label="Numer" value={location.number} onChange={handleChangeLocation} />
                </TournamentCreateAddressStreetNumberStyled>
            </TournamentCreateAddressContainerStyled>
    )
}


export default CreateTournamentLocation;