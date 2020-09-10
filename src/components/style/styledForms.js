import styled from 'styled-components'

import { colors } from '../../configureFiles/configStyle'

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const AuthFormStyled = styled.form`
    display: flex;
    flex-direction: column;
`
export const TextFiledContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`
export const AuthTextFiledStyled = styled(TextField)`
    margin-bottom: 10px;
`

export const FormTitleStyled = styled.p`
    width: 100%;
    font-size: 30px;
    text-align: center;
`

export const AddTeamFormStyled = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const EditTeamFormStyled = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const TournamentCreateTextFieldStyled = styled(TextField)`
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
`

export const TournamentCreateLogoContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    min-height: 40px;
`

export const TournamentCreateLogoTextFieldStyled = styled.input`
    display: none;
`

export const TournamentCreateLogoLabelStyled = styled.label`
    text-align: center;
    color: #7e6714;
    background-color: rgba(0,0,0,0.4);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    margin-right: 10px;
    display: flex;
    padding: 7px;
    border-radius: 5px;
`


export const TournamentCreateLogoTextFieldStyledW = styled.input`
    color: transparent;
    &::-webkit-file-upload-button {
    visibility: hidden;
    }
    &::before {
    content: 'Select some files';
    color: black;
    display: inline-block;
    background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
    }
    &:hover::before {
    border: none;
    }
    &:active {
    outline: 0;
    }
    &:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); 
    }
`

export const TournamentCreateDateStyled = styled(TournamentCreateTextFieldStyled)`
    margin-top: 20px;
`

const TournamentDivInit = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`

export const TournamentSectionTitleStyle = styled.p`
    padding: 0px;
    margin: 10px 0px 5px 0px;
    color: ${colors.secondary.light};
`

export const TournamentCreateAddressContainerStyled = styled(TournamentDivInit)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`

export const TournamentCreateMatchTimeContainerStyled = styled(TournamentDivInit)`
    display: flex;
`

export const TournamentCreateNumberInputContainerStyled = styled(TournamentDivInit)`
    max-width: 150px;
`

export const TournamentCreateAddressCityStyled = styled(TournamentDivInit)`
    flex-grow: 1;
`

export const TournamentCreateAddressStreetStyled = styled(TournamentDivInit)`
    flex-grow: 1;
`

export const TournamentCreateAddressStreetNumberStyled = styled(TournamentDivInit)`
    max-width: 100px;
    margin-left: auto;
    margin-right: auto;
`

export const TextFiledStyled = styled(TextField)`
    margin-bottom: 10px;
    width: 100%;
`

export const SwitchContainerStyled = styled(FormControlLabel)`
    color: ${colors.secondary.main};
    width: fit-content;
    margin: auto;
`
