import * as MatterJS from 'matter-js';
import { BodyType } from 'matter';

import maleImg from '../assets/male.png';
import itemsImg from '../assets/items.png';
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

interface ICollision { matterCollision: { addOnCollideStart: Function } }

export default class Player extends Phaser.Physics.Matter.Sprite implements IPlayer {
  inputKeys?: IKeys;
  spriteWeapon: Phaser.GameObjects.Sprite;
  weaponRotation: number;
  touching: any[];

  constructor(data: IPlayerParams) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.touching = [];
    this.scene.add.existing(this);
    this.weaponRotation = 0;
    // Weapon
    this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'items', 162);
    this.spriteWeapon.setScale(0.8);
    this.spriteWeapon.setOrigin(0.25, 0.75);
    this.scene.add.existing(this.spriteWeapon);

    const Matter = (Phaser.Physics.Matter as Record<string, unknown>).Matter as typeof MatterJS;
    const { Body, Bodies } = Matter;
    // green circle
    const playerCollider = Bodies.circle(this.x, this.x, 12, { isSensor: false, label: 'playerCollider' });
    // blue circle
    const playerSensor = Bodies.circle(this.x, this.x, 24, { isSensor: true, label: 'playerSensor' });
    const compoundBody: any = Body.create({
      parts: [playerCollider, playerSensor],
      friction: 0.35
    });
    this.setExistingBody(compoundBody as BodyType);
    this.setFixedRotation();

    this.createMiningCollition(playerSensor)

    // fix turn round
    this.scene.input.on('pointermove', (pointer: { worldX: number; }) => this.setFlip(pointer.worldX < this.x, false))
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('male', maleImg, maleAtlasJson);
    scene.load.animation('male_anim', maleAnimJson);
    scene.load.spritesheet('items', itemsImg, {
      frameWidth: 32,
      frameHeight: 32
    });
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
    this.spriteWeapon.setPosition(this.x, this.y);
    this.weaponRotate();
  }

  weaponRotate() {
    const pointer = this.scene.input.activePointer;
    if (pointer.isDown) {
      this.weaponRotation += 6;
    } else {
      this.weaponRotation = 0;
    }

    if (this.weaponRotation > 100) {
      this.weaponRotation = 0;
    }

    if (this.flipX) {
      this.spriteWeapon.setAngle(-this.weaponRotation - 90);
    } else {
      this.spriteWeapon.setAngle(this.weaponRotation);
    }

  }

  createMiningCollition(playerSensor: MatterJS.Body) {
    console.log(this.scene)
    const customScene = this.scene as Phaser.Scene & ICollision
    customScene.matterCollision.addOnCollideStart({
      objectA: [playerSensor],
      callback: (other: any) => {
        if (other.bodyB.isSensor) return;
        this.touching.push(other.gameObjectB);
        console.log(other.gameObjectB.name);
      },
      context: this.scene,
    });
  }

  get velocity() {
    return this.body.velocity;
  }
}

