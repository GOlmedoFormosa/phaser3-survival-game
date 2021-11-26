import Phaser from "phaser";
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import { MainScene } from './scenes/MainScene';
//Phaser configuration
const config = {
  backgroundColor: '#333333',
  type: Phaser.AUTO,
  height: 512,
  width: 512,
  parent: "survival-game",
  scene: [MainScene],
  scale: {
    zoom: 2
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  plugins: {
    scene: [{
      plugin: PhaserMatterCollisionPlugin, // The plugin class
      key: 'matterCollision', // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
      mapping: 'matterCollision' // Where to store in the Scene, e.g. scene.matterCollision
    }]
  }
};

const game = new Phaser.Game(config);