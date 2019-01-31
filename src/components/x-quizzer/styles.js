import { css } from "lit-element";

export default css`
  .indicator {
    display: grid;
    grid-template-columns: 1fr 160px;
    grid-template-rows: 1fr;
    grid-template-areas: ". count";
  }
  .count {
    grid-area: count;
    text-align: right;
  }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px;
    grid-gap: 16px;
    grid-template-areas:
      "a b"
      "c d";
  }
  .options > *:nth-of-type(1) {
    grid-area: a;
  }
  .options > *:nth-of-type(2) {
    grid-area: b;
  }
  .options > *:nth-of-type(3) {
    grid-area: c;
  }
  .options > *:nth-of-type(4) {
    grid-area: d;
  }
  .game-over {
    display: grid;
    grid-template-columns: 16px 1fr 16px;
    grid-template-rows: 100fr 60px 60px 100fr;
    grid-template-areas:
      ". . ."
      ". proclamation ."
      ". score ."
      ". . .";
  }
  .proclamation,
  .score {
    text-align: center;
  }
  .proclamation {
    grid-area: proclamation;
  }
  .score {
    grid-area: score;
  }
`;
