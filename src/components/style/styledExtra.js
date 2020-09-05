import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'
import Alert from '@material-ui/lab/Alert';

export const DialogContentContainerStyled = styled.div`
    background-color: ${colors.primary.main};
    color: ${colors.secondary.light};
`

export const AlertContainerStyled = styled(Alert)`
    align-items: center;
`