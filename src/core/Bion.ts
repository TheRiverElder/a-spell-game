
import type { World } from "./World";
import { Vec2 } from "./Vec2";

export class Bion {

    public position: Vec2 = Vec2.of(0, 0); // 当前物体位置
    public velocity: Vec2 = Vec2.of(0, 0); // 当前物体速度
    public acceleration: Vec2 = Vec2.of(0, 0); // 当前物体加速度，每个tick后应该清零
    public size: number = 0; // 当前物体体型，请不要直接修改
    public deltaSize: number = 0; // 当前物体体型变化量
    public radius: number = 0; // 当前物体半径

    public world: World;
    public playerControlled: boolean = false;

    constructor(world: World) {
        this.world = world;
    }

    onPreTick() {
        Vec2.selfSet(this.acceleration, [0, 0]);
        this.deltaSize = 0;
    }

    onTick() {
        // 摩擦力
        const fraction = Vec2.fromAngle(Vec2.angle(this.velocity), -this.world.config.F * Vec2.modulo(this.velocity));
        Vec2.selfAdd(this.acceleration, fraction);
        // 向中心点的牵引力
        const gravity = Vec2.multiply(Vec2.normalized(Vec2.substruct([0, 0], this.position)), this.world.config.G);
        Vec2.selfAdd(this.acceleration, gravity);
        if (this.playerControlled) {
            const force = Vec2.multiply(Vec2.normalized(this.world.playerController), this.world.config.playerSpeed);
            Vec2.selfAdd(this.acceleration, force);
        }
    }

    onInteract(other: Bion) {
        const distance = Vec2.distance(this.position, other.position);
        const minDistance = this.radius + other.radius;
        if (distance < minDistance) { // 发生重叠
            const direction = Vec2.substruct(other.position, this.position);
            const force = Vec2.fromAngle(Vec2.angle(direction), (1 / (distance / minDistance) - 1) * this.world.config.E);
            Vec2.selfAdd(other.acceleration, force);
            Vec2.selfSubstruct(this.acceleration, force);
        }
    }

    onPostTick() {
        Vec2.selfAdd(this.velocity, this.acceleration);
        this.world.move(this);
        this.size = Math.max(this.size + this.deltaSize, 0);
        this.radius = Math.sqrt(this.size / Math.PI);
    }

}