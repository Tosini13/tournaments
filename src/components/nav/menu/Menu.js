import React from 'react'
import { connect } from 'react-redux';

import TournamentMenu from './TournamentMenu';
import { MenuConst } from "../../../configureFiles/constants";
import DashboardMenu from './DashboardMenu';
import { changeMenuView } from '../../../store/actions/MenuActions';

const Menu = (props) => {
    if (props.menu.menu === MenuConst.tournament) return <TournamentMenu menuView={props.menu.menuView} changeMenuView={props.changeMenuView} />
    return <DashboardMenu menuView={props.menu.menuView} changeMenuView={props.changeMenuView} />
}

const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeMenuView: (menuViewConst) => dispatch(changeMenuView(menuViewConst))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);