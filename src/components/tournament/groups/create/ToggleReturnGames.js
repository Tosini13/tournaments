import React from 'react';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

import { SwitchContainerStyled } from '../../../style/styledForms';

const ToggleReturnGames = ({checked, setChecked}) => {
    return (
        <FormGroup>
            <SwitchContainerStyled
                control={<Switch checked={checked} onChange={setChecked} />}
                label="Mecze rewanżowe"
            />
        </FormGroup>
    );
}

export default ToggleReturnGames;