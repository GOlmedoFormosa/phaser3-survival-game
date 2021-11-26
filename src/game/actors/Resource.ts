
import resourcesImg from '../assets/resources.png';
import resourcesJson from '../assets/resources_atlas.json';
import treeAudio from '../assets/audio/tree.mp3';
import bushAudio from '../assets/audio/bush.mp3';
import rockAudio from '../assets/audio/rock.mp3';

interface IResource {
  scene: Phaser.Scene;
  resource: any;
}

export class Resource extends Phaser.Physics.Matter.Sprite {
  health: number;
  sound?: Phaser.Sound.BaseSound;

  constructor(data: IResource) {
    const Matter = (Phaser.Physics.Matter as Record<string, unknown>).Matter as typeof MatterJS;
    const { Bodies } = Matter;
    const { scene, resource } = data;
    super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    this.scene.add.existing(this);

    const yOrigin = resource.properties.find(({ name }: { name: string }) => name == 'yOrigin').value;
    this.name = resource.type;
    this.health = 5;
    this.sound = this.scene.sound.add(this.name);
    let resX = resource.x || 0;
    let resY = resource.y || 0;
    resX += this.width / 2;
    resY -= this.height / 2;
    resY = resY + this.height * (yOrigin - 0.5);
    const circleCollider = Bodies.circle(resX, resY, 12, { isSensor: false, label: 'collider' });
    this.setExistingBody(circleCollider)
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('resources', resourcesImg, resourcesJson);
    scene.load.audio('tree', treeAudio);
    scene.load.audio('rock', rockAudio);
    scene.load.audio('bush', bushAudio);
    scene.load.audio('tree_trunk', treeAudio);

  }

  get dead() {
    return this.health <= 0;
  }


  hit() {
    if (this.sound) this.sound.play();
    this.health--;
    console.log(`Hitting: ${this.name} Health:${this.health}`);
  }
}