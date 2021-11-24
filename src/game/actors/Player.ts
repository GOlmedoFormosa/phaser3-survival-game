import maleImg from '../assets/male.png';
import maleAtlasJson from '../assets/male_atlas.json';
import maleAnimJson from '../assets/male_anim.json';

export interface IPlayer {
  inputKeys: any
}

export default class Player extends Phaser.Physics.Matter.Sprite implements IPlayer {
  inputKeys: any;

  constructor(data: any) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('male', maleImg, maleAtlasJson);
    scene.load.animation('male_anim', maleAnimJson);

  }

  update() { // 60fps
    this.anims.play('male_walk', true);
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
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}