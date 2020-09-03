import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

export const MatchContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin: 5px 0px;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 2px;
    border-radius: 3px;
    &.match-live {
        .match-teams {
            @include live;
        }
        .match-result {
            > .score {
                background-color: $red;
                color: black;
            }
        }
    }
`

export const MatchTeamsContainerStyled = styled.div`
    grid-column: 1/11;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    color: ${colors.secondary.light};
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

export const MatchResultContainerStyled = styled.div`
    grid-column: 11/13;
    color: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .score {
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 2px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition-property: color, background-color;
        transition-duration: 0.3s;
    }
    &.match-result-not-started {
        color: grey;
    }
`