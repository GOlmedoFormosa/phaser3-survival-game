import maleImg from '../assets/male.png';
import maleAtlasJson from '../assets/male_atlas.json';
import maleAnimJson from '../assets/male_anim.json';

export interface IKeys {
  down: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  up: Phaser.Input.Keyboard.Key
}

export interface IPlayer {
  inputKeys?: IKeys
}

export interface IPlayerParams {
  scene: Phaser.Scene
  x: number
  y: number
  texture: string
  frame: string
}


export default class Player extends Phaser.Physics.Matter.Sprite implements IPlayer {
  inputKeys?: IKeys;

  constructor(data: IPlayerParams) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('male', maleImg, maleAtlasJson);
    scene.load.animation('male_anim', maleAnimJson);

  }

  get velocity() {
    return this.body.velocity;
  }

  update() { // 60fps
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys?.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys?.right.isDown) {
      playerVelocity.x = 1;
    }

    if (this.inputKeys?.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys?.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play('male_walk', true);
    } else {
      this.anims.play('male_idle', true);
    }
  }
}