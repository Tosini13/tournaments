import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AutorenewIcon from '@material-ui/icons/Autorenew';

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

export const DeleteIconStyled = styled(DeleteIcon)`
    color: ${colors.error.main};
`

export const EditIconStyled = styled(EditIcon)`
    color: ${colors.info.main};
`

export const AddIconStyled = styled(AddIcon)`
    color: ${colors.success.main};
`

export const DoneIconStyled = styled(DoneIcon)`
    color: ${colors.success.main};
`

export const ClearIconStyled = styled(ClearIcon)`
    color: ${colors.error.main};
`


export const AddGoalIconStyled = styled(AddIcon)`
    color: ${colors.secondary.main};
`

export const LessGoalIconStyled = styled(RemoveIcon)`
    color: ${colors.secondary.main};
`

export const StartMatchIconStyled = styled(PlayCircleFilledWhiteIcon)`
    color: ${colors.secondary.main};
`

export const RandomIconStyled = styled(AutorenewIcon)`
    color: ${colors.secondary.main};
`