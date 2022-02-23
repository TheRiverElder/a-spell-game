import type { Bion } from "./Bion";
import { Vec2 } from "./Vec2";
import { WorldBoundary } from "./WorldBoundary";

export class World {

    public config: { [key: string]: number } = {
        G: 0.05, // 引力常量
        F: 0.05, // 摩擦力常量
        E: 0.7, // 排斥力常量
        playerSpeed: 1.2, // 玩家速度
    };

    public playerController: Vec2 = Vec2.of(0, 0);

    public boundary: WorldBoundary = new WorldBoundary(-100, +100, -100, +100);

    public time: number = 0;

    private bions: Bion[] = [];

    getAllBions(): Bion[] {
        return this.bions.slice();
    }

    getClosestBions(targetBion: Bion, count: number = this.bions.length): Bion[] {
        const bionsWithDistance: [Bion, number][] = this.bions.map(b => [b, Vec2.distanceSquare(targetBion.position, b.position)]);
        return bionsWithDistance
            .sort(([, ad], [, bd]) => ad - bd)
            .map(([bion]) => bion)
            .filter(b => b !== targetBion)
            .slice(0, count);
    }

    addBions(...bions: Bion[]) {
        bions.forEach(bion => this.boundary.fixPosition(bion));
        this.bions.push(...bions);
    }

    removeBions(...bions: Bion[]) {
        const set = new Set(bions);
        for (let i = 0; i < this.bions.length;) {
            const bion = this.bions[i];
            if (set.has(bion)) {
                bions.splice(i, 1);
                set.delete(bion);
            } else {
                i++;
            }
        }
    }

    move(bion: Bion) {
        this.boundary.move(bion);
    }

    onTick() {
        this.time++;
        this.bions.forEach(it => it.onPreTick());
        this.bions.forEach(it => it.onTick());
        for (const bion of this.bions) {
            for (const other of this.bions) {
                if (bion === other) continue;
                bion.onInteract(other);
            }
        }
        this.bions.forEach(it => it.onPostTick());
    }
}