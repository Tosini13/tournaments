import React from 'react'
import { connect } from 'react-redux';

import MenuContent from './MenuContent';
import { MenuConst, DashboardViewConst, TournamentViewConst, GroupViewConst } from "../../../configureFiles/constants";
import { changeMenuView } from '../../../store/actions/MenuActions';

const Menu = (props) => {

    const getMenu = () => {
        switch (props.menu.menu) {
            case MenuConst.tournament:
                return TournamentViewConst;
            case MenuConst.main:
                return DashboardViewConst;
            case MenuConst.group:
                return GroupViewConst;
            default:
                return null;
        }
    }

    if (props.menu.menu) return <MenuContent menuList={getMenu()} menuView={props.menu.menuView} changeMenuView={props.changeMenuView} />
    return null;
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