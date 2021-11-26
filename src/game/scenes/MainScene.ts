import Phaser from 'phaser';
import Player, { IPlayer, IKeys } from '../actors/Player';
import tilesImg from '../assets/RPG Nature Tileset.png';
import resourcesImg from '../assets/resources.png';
import mapJson from '../assets/map.json';
import resourcesJson from '../assets/resources_atlas.json';

export class MainScene extends Phaser.Scene {
  player?: Phaser.Physics.Matter.Sprite & IPlayer;
  map?: Phaser.Tilemaps.Tilemap;
  constructor() {
    super('MainScene');
  }

  preload() {
    Player.preload(this);
    this.load.image('tiles', tilesImg);
    this.load.tilemapTiledJSON('map', mapJson);
    this.load.atlas('resources', resourcesImg, resourcesJson);
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    const tileSet = this.map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32);
    const layer1 = this.map.createLayer('Tile Layer 1', tileSet, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);


    this.player = new Player({ scene: this, x: 250, y: 250, texture: "male", frame: 'townsfolk_m_idle_1' });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as IKeys;

    this.addResources();

  }

  addResources() {
    const resources = this.map?.getObjectLayer('Resources');
    resources?.objects.forEach(resource => {
      console.log('res', resource)
      const resourceItem = new Phaser.Physics.Matter.Sprite(this.matter.world, resource.x || 0, resource.y || 0, 'resources', resource.type);
      resourceItem.setStatic(true);
      this.add.existing(resourceItem);
    })
  }

  update() {
    this.player?.update();
  }
}