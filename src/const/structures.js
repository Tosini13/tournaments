export const structuresConst = {
  groups: "GROUPS",
  playOffs: "PLAY_OFFS",
}

export let structuresConstString = new Map();
structuresConstString.set(structuresConst.groups, "Groups");
structuresConstString.set(structuresConst.playOffs, "Play offs");

export const constraintsConst = {
  maxLastRounds: 32,
}

export const roundsStringConst = {
  final: "Final",
  semiFinal: "Semi-final",
  quarterFinal: "Quarter-final",
  sixteen: "1/16 final",
  thirtyTwo: "1/32 final",
  sixtyFour: "1/64 final",
}

export let placeMatchesTitle = new Map();
placeMatchesTitle.set(1, "Final");
placeMatchesTitle.set(3, "3rd place");

export let roundMatchesTitle = new Map();
roundMatchesTitle.set(2, roundsStringConst.semiFinal);
roundMatchesTitle.set(4, roundsStringConst.quarterFinal);
roundMatchesTitle.set(8, roundsStringConst.sixteen);
roundMatchesTitle.set(16, roundsStringConst.thirtyTwo);
roundMatchesTitle.set(32, roundsStringConst.sixtyFour);

export const Result = {
  home: null,
  away: null
};

export const TeamsPlaceholder = {
  home: null,
  away: null
};