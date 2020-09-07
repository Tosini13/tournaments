import React from 'react'

import { TournamentCreateLogoTextFieldStyled, TournamentCreateLogoLabelStyled, TournamentCreateLogoContainerStyled } from '../../style/styledForms';
import { IconButtonStyled } from '../../style/styledButtons';
import { ClearIconStyled } from '../../style/styledIcons';

const CreateTournamentLogo = ({ handleChangeImage, image, onRemoveImage }) => {
    return (
        <TournamentCreateLogoContainerStyled>
            <TournamentCreateLogoTextFieldStyled type="file" name="file" id="file" onChange={handleChangeImage} />
            <TournamentCreateLogoLabelStyled htmlFor="file">
                {image ? "Zmień" : "Wybierz"}
            </TournamentCreateLogoLabelStyled>
            {image ?
                <>
                    <p>{image.name}</p>
                    <IconButtonStyled onClick={onRemoveImage}>
                        <ClearIconStyled />
                    </IconButtonStyled>
                </>
                : <p>Logo</p>
            }
        </TournamentCreateLogoContainerStyled>
    )
}


export default CreateTournamentLogo;