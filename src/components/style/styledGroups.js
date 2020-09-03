import styled from 'styled-components'
import { colors } from '../../configureFiles/configStyle'

export const GroupSummaryListStyled = styled.div`
    display: flex;
    flex-direction: column;
`
export const GroupTableStyled = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    margin: 10px 0px;
    > table {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: 3px;
        border-collapse: collapse;
        td, th{
            padding: 5px 3px;
        }
        th{
            color: ${colors.secondary.main};
            text-transform: uppercase;
            font-size: 10px;
        }
        .group-table-promoted {
            background-color: rgba(0, 255, 0, 0.15);
        }
        .group-table-live {
            @include live;
        }
            background-color: rgba(0, 0, 0, 0.1);
    }
`