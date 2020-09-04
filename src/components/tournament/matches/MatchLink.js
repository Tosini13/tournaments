import React from 'react';

import { Link } from 'react-router-dom';

const MatchLink = ({ auth, link, children }) => {
    if (auth) return <Link to={link}> {children} </Link>;
    return <div> {children} </div>;

}

export default MatchLink;