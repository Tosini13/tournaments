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

export const BracketRoundsContainerStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const BracketRoundContainerStyled = styled.div`
  text-align: center;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 3px;
  width: 100%;
  min-width: 270px;
  max-width: 325px;
`;

export const BracketGamesContainerStyled = styled.div`
    margin: 5px 10px;
    background-color: ${colors.primary.dark};
`;

export const BracketMatchContainerStyled = styled.div`
    background-color: ${colors.primary.dark};
    margin: 3px 0px;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
`;

export const BracketMatchTeamsContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: ${colors.primary.dark};
    > p:nth-child(1) {
        grid-column: 1/4;
        justify-content: flex-end;
        text-align: right;
    }
    > p:nth-child(2) {
        grid-column: 4/5;
    }
    > p:nth-child(3) {
        grid-column: 5/8;
        justify-content: flex-start;
    }
    > p {
        margin: 0px;
        padding: 0px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const BracketRoundTitleStyled = styled.div`
    font-size: 9px;
    color: ${colors.secondary.main};
`;
