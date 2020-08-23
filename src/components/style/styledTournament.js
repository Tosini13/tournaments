import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';

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
padding: 5px;
`

export const TournamentLinkItemStyled = styled(Link)`
display: flex;
justify-content: space-between;
align-items: stretch;
width: 100%;
color: ${colors.secondary.main};
>div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
`

export const TournamentListItemTitleStyled = styled.p`
padding: 0px;
margin: 0px;
margin-left: 5px;
color: ${colors.secondary.main};
font-size: 15px;
text-align: center;
flex-grow: 1;
`

export const TournamentListItemDateStyled = styled.p`
padding: 0px;
margin: 0px;
background-color: rgba(0,0,0,0.1);
padding: 2px;
border-radius: 5px;
width: fit-content;
font-size: 11px;
}
`

export const TournamentListItemImgStyled = styled.img`
height: 60px;
width: 60px;
background-color: rgba(0,0,0,0.2);
padding: 5px;
border-radius: 5px;
`

export const TournamentListItemFavouriteStyled = styled.div`
padding: 1px;
border-radius: 3px;
font-size: 0px;
`