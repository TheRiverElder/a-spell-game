import { constraints } from "../utils";
import type { Bion } from "./Bion";
import { Vec2, X, Y } from "./Vec2";


export class WorldBoundary {

    public readonly left: number;
    public readonly right: number;
    public readonly up: number;
    public readonly down: number;

    public readonly width: number;
    public readonly height: number;

    constructor(left: number, right: number, up: number, down: number) {
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;

        this.width = right - left;
        this.height = down - up;
    }

    move(bion: Bion) {
        Vec2.selfAdd(bion.position, bion.velocity);
        // const justifiedX = this.left + (positionAfter[X] + this.width) % this.width;
        // const justifiedY = this.up + (positionAfter[Y] + this.height) % this.height;
        this.fixPosition(bion);
    }

    fixPosition(bion: Bion) {
        const { radius, position } = bion;
        const justifiedX = constraints(position[X], this.left + radius, this.right - radius);
        const justifiedY = constraints(position[Y], this.up + radius, this.down - radius);
        Vec2.selfSet(bion.position, [justifiedX, justifiedY]);
    }
}