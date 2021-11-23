import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  player?: Phaser.Physics.Matter.Sprite;
  inputKeys?: any;
  constructor() {
    super('MainScene');
  }

  preload() {
    console.log('preload');
  }

  create() {
    this.player = this.matter.add.sprite(0, 0, "player");
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() { // 60fps
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