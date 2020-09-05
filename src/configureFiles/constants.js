export const DashboardViewConst = {
    live: 'LIVE',
    today: 'TODAY',
    past: 'PAST',
    future: 'FUTURE'
}

export const TournamentViewConst = {
    info: 'INFO',
    groups: 'GROUPS',
    bracket: 'BRACKET',
    teams: 'TEAMS'
}

export const GroupViewConst = {
    table: 'TABLE',
    matches: 'MATCHES',
}


export const MenuConst = {
    main: 'MAIN',
    tournament: 'TOURNAMENT',
    group: 'GROUP',
    bracket: 'BRACKET',
}

export let menuStringConst = new Map();

menuStringConst.set(TournamentViewConst.info, 'Informacje');
menuStringConst.set(TournamentViewConst.groups, 'Faza grupowa');
menuStringConst.set(TournamentViewConst.bracket, 'Faza pucharowa');
menuStringConst.set(TournamentViewConst.teams, 'Zespoły');

menuStringConst.set(DashboardViewConst.live, 'Na żywo');
menuStringConst.set(DashboardViewConst.today, 'Dzisiaj');
menuStringConst.set(DashboardViewConst.past, 'Przeszłe');
menuStringConst.set(DashboardViewConst.future, 'Przyszłe');

menuStringConst.set(GroupViewConst.table, 'Tabela');
menuStringConst.set(GroupViewConst.matches, 'Mecze');