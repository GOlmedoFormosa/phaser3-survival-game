import Phaser from 'phaser';
import Player, { IPlayer, IKeys } from '../actors/Player';
import tilesImg from '../assets/RPG Nature Tileset.png';
import mapJson from '../assets/map.json';
import { Resource } from '../actors/Resources';

export class MainScene extends Phaser.Scene {
  player?: Phaser.Physics.Matter.Sprite & IPlayer;
  map?: Phaser.Tilemaps.Tilemap;
  constructor() {
    super('MainScene');
  }

  preload() {
    Player.preload(this);
    Resource.preload(this);

    this.load.image('tiles', tilesImg);
    this.load.tilemapTiledJSON('map', mapJson);
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
    resources?.objects.forEach((resource: Phaser.Types.Tilemaps.TiledObject) => {
      new Resource({ scene: this, resource });
    })
  }

  update() {
    this.player?.update();
  }
}