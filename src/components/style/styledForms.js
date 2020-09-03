import styled from 'styled-components'

import TextField from '@material-ui/core/TextField';


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
`

export const TournamentCreateAddressContainerStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`


export const TournamentCreateMatchTimeContainerStyled = styled.div`
    display: flex;
`

export const TournamentCreateNumberInputContainerStyled = styled.div`
    max-width: 150px;
`

export const TournamentCreateAddressCityStyled = styled.div`
    flex-grow: 1;
`

export const TournamentCreateAddressStreetStyled = styled.div`
    flex-grow: 1;
`

export const TournamentCreateAddressStreetNumberStyled = styled.div`
    max-width: 100px;
    margin-left: 5px;
`

export const TextFiledStyled = styled(TextField)`
    margin-bottom: 10px;
    width: 100%;
`