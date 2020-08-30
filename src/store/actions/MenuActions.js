export const changeMenu = (menuConst) => {
    return {
        type: 'MENU_CHANGED',
        menuConst
    }
}

export const changeMenuView = (menuViewConst) => {
    return {
        type: 'MENU_VIEW_CHANGED',
        menuViewConst
    }
}