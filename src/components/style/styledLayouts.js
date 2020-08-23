import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';

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

export const TournamentDashboardStyled = styled.ul`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 50%);
`

export const TournamentDashboardElementStyled = styled.li`
    padding: 20px 10px 5px 10px;
    background-color: transparent;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    margin: 0px 5px;
    ${props => props.current ?
        `background-color: rgba(0,0,0,0.2);
        transform: translateY(5px);`
        :
        `background-color: transparent;`
    }
`

export const TournamentListItemStyled = styled(ListItem)`
    position: relative;
    margin-top: 10px;
    background-color: rgba(0,0,0,0.1);  
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
`

export const TournamentLinkItemStyled = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: ${colors.secondary.main};
    >div{
        display: flex;
        flex-direction: column;
        justofy-content: space-between;
    }
`

export const TournamentListItemTitleStyled = styled.p`
    padding: 0px;
    margin: 0px;
    margin-left: 5px;
    color: ${colors.secondary.main};
    font-size: 20px;
`

export const TournamentListItemDateStyled = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
    background-color: rgba(0,0,0,0.1);
    padding: 3px;
    border-top-left-radius: 5px;  
    border-top-right-radius: 5px;
    font-size: 11px;
}
`
export const TournamentListItemImgStyled = styled.img`
    height: 50px;
    width: 50px;
`