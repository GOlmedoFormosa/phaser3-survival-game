
import resourcesImg from '../assets/resources.png';
import resourcesJson from '../assets/resources_atlas.json';

interface IResource {
  scene: Phaser.Scene;
  resource: any;
}

export class Resource extends Phaser.Physics.Matter.Sprite {

  constructor(data: IResource) {
    const Matter = (Phaser.Physics.Matter as Record<string, unknown>).Matter as typeof MatterJS;
    const { Bodies } = Matter;
    const { scene, resource } = data;
    super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    this.scene.add.existing(this);

    const yOrigin = resource.properties.find(({ name }: { name: string }) => name == 'yOrigin').value;
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
  }

}