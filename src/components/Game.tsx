import { Stage, Container } from "@pixi/react";
import { Player } from "./Player";
export const Game = () => {
  const stageProps = {
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  };

  return (
    <Stage {...stageProps}>
      <Container x={150} y={150}>
        <Player />
      </Container>
    </Stage>
  );
};
