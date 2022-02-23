import type { Vec2 } from "./Vec2";

export interface GameObject {
    
    position: Vec2; // 当前物体位置

    onPreTick(): void;

    onTick(): void;

    onPostTick(): void;
    
}