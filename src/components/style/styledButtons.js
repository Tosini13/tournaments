import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export const IconButtonBackStyled = styled(IconButton)`
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translate(-100px, 0px);
    transition: transform 0.3s, opacity 0.3s;
    color: ${colors.secondary.main};
    &.btn-back-show {
        transform: translate(0px, 0px);
        opacity: 1;
    }
`

export const IconButtonStyled = styled(IconButton)`
    padding: 5px;
    margin: 0px 2px;
    height: fit-content;
    width: fit-content;
`

export const ButtonRowContainerStyled = styled.div`
    margin-top: 30px;
    display: flex;
`

export const ButtonStyled = styled(Button)`
    color: ${colors.secondary.main};
    background-color: rgba(0,0,0,0.4);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    margin-left: auto;
    margin-right: auto;
    display: flex;
`

export const ButtonSuccessStyled = styled(ButtonStyled)`
    color: ${colors.success.main};
`

export const ButtonErrorStyled = styled(ButtonStyled)`
    color: ${colors.error.main};
`

export const ButtonInfoStyled = styled(ButtonStyled)`
    color: ${colors.info.main};
`

export const LinkStyled = styled(Link)`
    text-decoration: none;
`

export const ALinkStyled = styled.a`
    text-decoration: none;
    color: ${colors.secondary.light};
`

