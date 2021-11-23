import Phaser from "phaser";

//Generic Phaser configuration
const config = {
  backgroundColor: '#333333',
  type: Phaser.AUTO,
  height: 512,
  width: 512,
  parent: "survival-game",
  scene: [],
  scale: {
    zoom: 2
  }
};

const game = new Phaser.Game(config);