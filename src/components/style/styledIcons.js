import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'


export const HamburgerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25px;
    >div{
        background-color: ${colors.secondary.main};
        width: 100%;
        height: 3px;
        border-radius: 2px;
        margin-bottom: 4px;
        &:last-child{
            margin-bottom: 0px;
        }
        transition: transform 0.3s, width 0.5s;
    }
    ${props => props.open ?
        `
    >div:first-child{
        transform: rotateZ(45deg) translate(5px, 5px);
    }
    >div:last-child{
        transform: rotateZ(-45deg) translate(5px, -5px);
    }
    >div:nth-child(2){
        width: 0px;
    }` : ``}
    `;


export const IconFontelloStyled = styled.i`
    font-size: 17px;
`