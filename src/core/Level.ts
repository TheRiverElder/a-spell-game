import { array, rand } from "../utils";
import { Bion } from "./Bion";
import { Vec2 } from "./Vec2";
import type { World } from "./World";
import { WorldBoundary } from "./WorldBoundary";

export class Level {
    initialize(world: World) {

        const width = 400;
        const height = 300;

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        world.boundary = new WorldBoundary(-halfWidth, +halfWidth, -halfHeight, +halfHeight);

        const bions = array(50, () => {
            const bion = new Bion(world);
            bion.position = [rand(-halfWidth, halfWidth), rand(-halfHeight, halfHeight)];
            bion.velocity = Vec2.fromAngle(rand(0, 2 * Math.PI), rand(5, 10));
            bion.size = rand(50, 100);
            return bion;
        });
        const player = new Bion(world);
        player.size = 150;
        player.playerControlled = true;
        world.addBions(...bions, player);
    }
}