import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';

export const MenuSideBarContainerStyled = styled.div`
    position: fixed;
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

export const NavBar = styled.nav`
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    background-color: ${colors.primary.main};
    color: ${colors.secondary.main};
`

export const MenuLinkStyled = styled(Link)`
    color: inherit;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`
export const ListItemStyled = styled(ListItem)`
    color: ${colors.secondary.main};
    border-bottom: rgba(0,0,0,0.2) solid 1px;
`
