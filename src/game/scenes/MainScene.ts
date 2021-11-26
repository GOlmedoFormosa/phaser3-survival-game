import Phaser from 'phaser';
import Player, { IPlayer, IKeys } from '../actors/Player';
import tilesImg from '../assets/RPG Nature Tileset.png';
import resourcesImg from '../assets/resources.png';
import mapJson from '../assets/map.json';
import resourcesJson from '../assets/resources_atlas.json';

type TileSet = { [id: string]: { type: string } };
type TileProperty = { [id: string]: { yOrigin: number } };
type ResourcePropertyFromTileSet = {
  [id: string]: {
    id: string;
    type: string;
    yOrigin: number;
  }
}

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
    const Matter = (Phaser.Physics.Matter as Record<string, unknown>).Matter as typeof MatterJS;
    const { Bodies } = Matter;

    const resources = this.map?.getObjectLayer('Resources');
    resources?.objects.forEach((resource: Phaser.Types.Tilemaps.TiledObject) => {
      let resX = resource.x || 0;
      let resY = resource.y || 0;
      const resourceItem = new Phaser.Physics.Matter.Sprite(this.matter.world, resX, resY, 'resources', resource.type);
      const yOrigin = resource.properties.find(({ name }: { name: string }) => name == 'yOrigin').value;
      resX += resourceItem.width / 2;
      resY -= resourceItem.height / 2;
      resY = resY + resourceItem.height * (yOrigin - 0.5);
      const circleCollider = Bodies.circle(resX, resY, 12, { isSensor: false, label: 'collider' });
      resourceItem.setExistingBody(circleCollider)
      resourceItem.setStatic(true);
      resourceItem.setOrigin(0.5, yOrigin);
      this.add.existing(resourceItem);
    })
  }

  update() {
    this.player?.update();
  }
}