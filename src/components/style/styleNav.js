import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

import { Link } from 'react-router-dom'

export const MenuStyled = styled.ul`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 80%);
    display: flex;
    justify-content: space-evenly;
    z-index: 1;
    padding: 0px;
    margin: 0px;
`

export const MenuElementStyled = styled.li`
    padding: 20px 10px 5px 10px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    margin: 0px 5px;
    font-size: 10px;
    display: flex;
    text-align: center;
    align-items: center;
    cursor: pointer;
    ${props => props.selected ?
        `background-color: ${colors.primary.dark};
        transform: translateY(5px);`
        :
        `background-color: ${colors.primary.main};`
    }
`

export const MenuSideBarContainerStyled = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 80vw;
    background-color: ${colors.primary.main};
    z-index: 10;
    transition: transform 0.3s, box-shadow 0.5s;

    transform: ${props => props.open ?
        `translateX(0%);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.6);`
        :
        `translateX(-100%);
        box-shadow: none;`
    }
`

export const NavBarStyled = styled.nav`
    position: relative;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    background-color: ${colors.primary.main};
    color: ${colors.secondary.main};
    z-index: 10;
    height: 45px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
`

export const NavContainerStyled = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
`

export const MenuLinkStyled = styled(Link)`
    color: inherit;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
`
