import React from "react";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const style = {
    select: {
        width: '100%',
        margin: '15px 0px',
    }
}

const CreateBracketBracketMenu = ({ roundQtt, handleSelectChange, placeMatchesQtt, handlePlaceMatchesQttChange }) => {
    return (
        <>
            <FormControl style={style.select}>
                <InputLabel>Wybierz ilość meczy:</InputLabel>
                <Select
                    value={roundQtt}
                    onChange={handleSelectChange}
                >
                    <MenuItem value={1}>Finał</MenuItem>
                    <MenuItem value={2}>Finał, Półfinały</MenuItem>
                    <MenuItem value={4}>Finał, Półfinały, Ćwierćfinały</MenuItem>
                    <MenuItem value={8}>Finał, Półfinały, Ćwierćfinały, 1/16</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={style.select}>
                <InputLabel>Wybierz ilość meczy o miejsca:</InputLabel>
                <Select
                    value={placeMatchesQtt}
                    onChange={handlePlaceMatchesQttChange}
                >
                    <MenuItem value={1}>Finał</MenuItem>
                    <MenuItem value={3}>3 miejsce</MenuItem>
                    <MenuItem value={5}>5 miejsce</MenuItem>
                    <MenuItem value={7}>7 miejsce</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default CreateBracketBracketMenu;
