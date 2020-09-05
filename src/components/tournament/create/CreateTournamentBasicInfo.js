import React from 'react'
import moment from 'moment';
import { TournamentCreateTextFieldStyled, TournamentCreateDateStyled } from '../../style/styledForms';

const CreateTournamentBasicInfo = ({ name, handleChange }) => {

    return (
        <>
            <TournamentCreateTextFieldStyled id="name" label="Nazwa turnieju" value={name} onChange={handleChange} required />
            <TournamentCreateDateStyled
                id="date"
                label="Data i czas rozpoczęcia turnieju"
                type="datetime-local"
                defaultValue={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange}
                required
            />
        </>
    )
}


export default CreateTournamentBasicInfo;