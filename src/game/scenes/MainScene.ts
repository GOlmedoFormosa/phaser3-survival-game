import Phaser from 'phaser';
import maleImg from '../assets/male.png';
import maleAtlasJson from '../assets/male_atlas.json';
import maleAnimJson from '../assets/male_anim.json';

export class MainScene extends Phaser.Scene {
  player?: Phaser.Physics.Matter.Sprite;
  inputKeys?: any;
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.atlas('male', maleImg, maleAtlasJson);
    this.load.animation('male_anim', maleAnimJson);
  }

  create() {
    this.player = this.matter.add.sprite(0, 0, "male", 'townsfolk_m_idle_1');

    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() { // 60fps
    this.player?.anims.play('male_walk', true);
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys?.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }

    if (this.inputKeys?.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.player?.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}