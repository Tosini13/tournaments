import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import { AlertContainerStyled } from '../style/styledExtra'

const Alert = (props) => {
  const { open, onClose, message, severity } = props;

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <AlertContainerStyled elevation={6} variant="filled" severity={severity}>
        {message}
      </AlertContainerStyled>
    </Snackbar>)
}

export default Alert;