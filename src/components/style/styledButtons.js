import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

import IconButton from '@material-ui/core/IconButton';


export const IconButtonBackStyled = styled.div`
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translate(-100px, 0px);
    transition: transform 0.3s, opacity 0.3s;
    &.btn-back-show {
        transform: translate(0px, 0px);
        opacity: 1;
    }
`