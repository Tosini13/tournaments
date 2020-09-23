import React from "react";

import MatchMock from '../matches/MatchMock';

const GameSummaryRecursive = ({ game, teams }) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      <MatchMock match={game.match} teams={teams} />
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursive game={game.previousMatchHome} teams={teams} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursive game={game.previousMatchAway} teams={teams} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursive;
