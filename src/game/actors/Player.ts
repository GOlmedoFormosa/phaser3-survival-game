import * as MatterJS from 'matter-js';
import { BodyType } from 'matter';

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

    const Matter = (Phaser.Physics.Matter as Record<string, unknown>).Matter as typeof MatterJS;
    const { Body, Bodies } = Matter;
    const playerCollider = Bodies.circle(this.x, this.x, 12, { isSensor: false, label: 'playerCollider' });
    const playerSensor = Bodies.circle(this.x, this.x, 24, { isSensor: true, label: 'playerSensor' });
    const compoundBody: any = Body.create({
      parts: [playerCollider, playerSensor],
      friction: 0.35
    });
    this.setExistingBody(compoundBody as BodyType);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('male', maleImg, maleAtlasJson);
    scene.load.animation('male_anim', maleAnimJson);

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

  get velocity() {
    return this.body.velocity;
  }
}

