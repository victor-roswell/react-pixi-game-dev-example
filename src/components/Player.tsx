import { Stage, useTick, Sprite, Container } from "@pixi/react";
import { useEffect, useState } from "react";

function keyboard(value) {
  const key: any = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}

export const Player = () => {
  const [xVelocity, setXVelociy] = useState(0);
  const [yVelocity, setYVelocity] = useState(0);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Keyboard Listeners
  const left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

  // Left Arrow
  left.press = () => {
    setXVelociy(-10);
  };
  left.release = () => {
    setXVelociy(0);
  };

  // Right Arrow
  right.press = () => {
    setXVelociy(10);
  };

  right.release = () => {
    setXVelociy(0);
  };

  // Up Arrow
  up.press = () => {
    setYVelocity(-10);
  };

  up.release = () => {
    setYVelocity(0);
    setY(0);
  };

  // Gameloop
  useTick((delta) => {
    gameLoop(delta);
  });

  const gameLoop = (delta) => {
    setX(x + xVelocity);
    setY(y + yVelocity);
  };

  return (
    <Sprite
      image="https://pixijs.io/pixi-react/img/bunny.png"
      x={x}
      y={y}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  );
};
