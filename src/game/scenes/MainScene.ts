import Phaser from 'phaser';
import Player, { IPlayer, IKeys } from '../actors/Player';

export class MainScene extends Phaser.Scene {
  player?: Phaser.Physics.Matter.Sprite & IPlayer;
  constructor() {
    super('MainScene');
  }

  preload() {
    Player.preload(this);
  }

  create() {
    this.player = new Player({ scene: this, x: 0, y: 0, texture: "male", frame: 'townsfolk_m_idle_1' });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as IKeys;

  }

  update() {
    this.player?.update();
  }
}