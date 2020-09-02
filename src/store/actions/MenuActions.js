export const changeMenu = (menu) => {
    return {
        type: 'MENU_CHANGED',
        menu
    }
}

export const changeMenuView = (menuView) => {
    return {
        type: 'MENU_VIEW_CHANGED',
        menuView
    }
}