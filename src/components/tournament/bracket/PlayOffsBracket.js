import React from "react";

import { BracketRoundsContainerStyled, BracketRoundContainerStyled } from "../../style/styledBracket";
import GameSummaryRecursive from "./GameSummaryRecursive";

const PlayOffsBracket = ({ bracket, teams }) => {
  return (
    <BracketRoundsContainerStyled>
      {bracket.placeMatches && bracket.placeMatches.map((game) => (
        <BracketRoundContainerStyled key={game.round}>
          <GameSummaryRecursive game={game} teams={teams} />
        </BracketRoundContainerStyled>
      ))}
    </BracketRoundsContainerStyled>
  );
};

export default PlayOffsBracket;
