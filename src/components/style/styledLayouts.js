import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';

export const ListItemStyled = styled(ListItem)`
    color: ${colors.secondary.main};
    border-bottom: rgba(0,0,0,0.2) solid 1px;
`

export const ListItemLinkStyled = styled(Link)`
    color: ${colors.secondary.main};
    background-color: rgba(0,0,0,0.2);
    margin-bottom: 10px;
    padding: 5px 10px;
    text-align: center;
    border-radius: 5px;
    display: flex;
    width: 100%;
    justify-content: center;
`

export const AppStyled = styled.div`
    background-color: ${colors.primary.main};
    color: ${colors.secondary.light};
    min-height: 100vh;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
`

export const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    padding-top: $header;
    padding: 100px 10px 5px 10px;
    height: 100vh;
    box-sizing: border-box;
`

export const MainContainerStyled = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

export const MainContainerContentStyled = styled.div`
    flex-grow: 1;
`