import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';

export const TournamentDashboardStyled = styled.ul`
position: fixed;
top: 0;
left: 50%;
transform: translate(-50%, 50%);
display: flex;
justify-content: space-evenly;
`

export const TournamentDashboardElementStyled = styled.li`
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
${props => props.selected ?
        `background-color: ${colors.primary.dark};
    transform: translateY(5px);`
        :
        `background-color: ${colors.primary.main};`
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


export const TournamentDetailsContainerStyled = styled.div`

`

export const TournamentDetailsHeaderStyled = styled.div`
    display: flex;   
`

export const TournamentDetailsTitleStyled = styled.div`
    font-size: 20px;   
    text-align: center;
    color: ${colors.secondary.main};
    flex-grow: 1;
`

export const TournamentDetailsInfoStyled = styled.div`
    display: flex;
    align-items: center;
`

export const TournamentDetailsInfoTitleStyled = styled.p`
    margin: 2px;
    margin-right: 10px;
`

export const TournamentDetailsInfoContentStyled = styled.p`
    color: ${colors.secondary.main};
    font-size: 20px;
    margin: 2px;
`

export const TournamentDetailsDashboardStyled = styled.div`
    
`