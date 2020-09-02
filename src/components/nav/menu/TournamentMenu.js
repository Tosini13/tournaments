import React, { Component } from 'react';

import { MenuStyled, MenuElementStyled } from '../../style/styleNav'
import { TournamentViewConst } from "../../../configureFiles/constants";

class TournamentMenu extends Component {

    render() {
        const menuView = this.props.menuView;
        const changeMenuView = this.props.changeMenuView;
        return (
            <MenuStyled>
                <MenuElementStyled selected={menuView === TournamentViewConst.info ? true : false}
                    onClick={() => { changeMenuView(TournamentViewConst.info) }}>
                    Informacje
                    </MenuElementStyled>
                <MenuElementStyled selected={menuView === TournamentViewConst.groups ? true : false}
                    onClick={() => { changeMenuView(TournamentViewConst.groups) }}>
                    Faza grupowa
                    </MenuElementStyled>
                <MenuElementStyled selected={menuView === TournamentViewConst.bracket ? true : false}
                    onClick={() => { changeMenuView(TournamentViewConst.bracket) }}>
                    Faza pucharowa
            </MenuElementStyled>
                <MenuElementStyled selected={menuView === TournamentViewConst.teams ? true : false}
                    onClick={() => { changeMenuView(TournamentViewConst.teams) }}>
                    Zespoły
                    </MenuElementStyled>
            </MenuStyled>
        )
    }
}

export default TournamentMenu;