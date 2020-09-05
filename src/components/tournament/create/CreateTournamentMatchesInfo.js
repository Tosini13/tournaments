import React from 'react'
import { TournamentCreateTextFieldStyled, TournamentCreateMatchTimeContainerStyled, TournamentSectionTitleStyle } from '../../style/styledForms';

const CreateTournamentMatchesInfo = ({ fields, matchTimeInGroup, breakTimeInGroup, matchTimeInBracket, breakTimeInBracket, handleChange }) => {

    return (
        <>
            <TournamentSectionTitleStyle>W fazie grupowej</TournamentSectionTitleStyle>
            <TournamentCreateMatchTimeContainerStyled>
                <TournamentCreateTextFieldStyled name='matchTimeInGroup' id='matchTimeInGroup' label="Czas meczu (min)" type='number' value={matchTimeInGroup} onChange={handleChange} required />
                <TournamentCreateTextFieldStyled name='breakTimeInGroup' id='breakTimeInGroup' label="Czas przerwy (min)" type='number' value={breakTimeInGroup} onChange={handleChange} required />
            </TournamentCreateMatchTimeContainerStyled>
            <TournamentSectionTitleStyle>W fazie pucharowej</TournamentSectionTitleStyle>
            <TournamentCreateMatchTimeContainerStyled>
                <TournamentCreateTextFieldStyled name='matchTimeInBracket' id='matchTimeInBracket' label="Czas meczu (min)" type='number' value={matchTimeInBracket} onChange={handleChange} required />
                <TournamentCreateTextFieldStyled name='breakTimeInBracket' id='breakTimeInBracket' label="Czas przerwy (min)" type='number' value={breakTimeInBracket} onChange={handleChange} required />
            </TournamentCreateMatchTimeContainerStyled>
            <TournamentCreateTextFieldStyled name='fields' id='fields' label="Ilość boisk" type='number' value={fields} onChange={handleChange} required />
        </>
    )
}


export default CreateTournamentMatchesInfo;