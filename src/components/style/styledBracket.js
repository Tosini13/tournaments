import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

export const ChooseTeamContainerStyled = styled.div`
    text-align: center;
    background-color: rgba(0,0,0,0.2);
    padding: 5px;
    margin: 5px auto;
`

export const ChooseTeamTitleStyled = styled.p`
    padding: 5px;
    margin: 0px;
`

export const ChooseTeamStyled = styled.div`
    position: relative;
    padding: 5px 0px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-top: 2px;
    border-radius: 2px;
    ${props => props.isChosen ?
        `background-color: ${colors.primary.dark};`
        :
        `background-color: ${colors.primary.light};`
    }
`

export const ChooseTeamNameStyled = styled.p`
    padding: 2px;
    margin: 0px;
`

export const ChooseTeamIconContainerStyled = styled.div`
    align-self: end;
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
`